"""Structural and safety checks for the source-only Guide Center MVP."""

from __future__ import annotations

import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
GUIDE_ROOT = ROOT / "src" / "guide-center"
VENTOY_ROOT = ROOT / "src" / "ventoy"


def load_window_json(path: Path, variable: str):
    content = path.read_text(encoding="utf-8")
    match = re.fullmatch(
        rf"\s*window\.{re.escape(variable)}\s*=\s*(.*);\s*",
        content,
        flags=re.DOTALL,
    )
    if not match:
        raise AssertionError(f"{path} is not one classic-script JSON assignment")
    return json.loads(match.group(1))


class AssetParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets: list[str] = []
        self.ids: list[str] = []
        self.has_main = False
        self.has_search_label = False
        self.has_lang = False

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "html" and attributes.get("lang"):
            self.has_lang = True
        if tag == "main":
            self.has_main = True
        if tag == "label" and attributes.get("for") == "guide-search":
            self.has_search_label = True
        if attributes.get("id"):
            self.ids.append(attributes["id"])
        if tag == "script" and attributes.get("src"):
            self.assets.append(attributes["src"])
        if tag == "link" and attributes.get("rel") in {"icon", "stylesheet"} and attributes.get("href"):
            self.assets.append(attributes["href"])


class GuideCenterTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.guides = load_window_json(
            GUIDE_ROOT / "data" / "guides.js", "LEARN_MEDICAT_GUIDES"
        )
        cls.tools = load_window_json(
            GUIDE_ROOT / "data" / "tools.js", "LEARN_MEDICAT_TOOLS"
        )
        cls.glossary = load_window_json(
            GUIDE_ROOT / "data" / "glossary.js", "LEARN_MEDICAT_GLOSSARY"
        )
        cls.intake = load_window_json(
            GUIDE_ROOT / "data" / "intake.js", "LEARN_MEDICAT_INTAKE"
        )
        cls.password = load_window_json(
            GUIDE_ROOT / "data" / "password.js", "LEARN_MEDICAT_PASSWORD"
        )

    def test_index_has_local_assets_and_accessibility_landmarks(self):
        index = (GUIDE_ROOT / "index.html").read_text(encoding="utf-8")
        parser = AssetParser()
        parser.feed(index)

        self.assertTrue(parser.has_lang)
        self.assertTrue(parser.has_main)
        self.assertTrue(parser.has_search_label)
        self.assertEqual(len(parser.ids), len(set(parser.ids)), "duplicate static HTML IDs")
        self.assertGreaterEqual(len(parser.assets), 5)

        for asset in parser.assets:
            self.assertFalse(re.match(r"^[a-z]+://", asset), f"network asset: {asset}")
            self.assertTrue((GUIDE_ROOT / asset.split("?", 1)[0]).is_file(), f"missing asset: {asset}")

    def test_css_has_no_network_assets(self):
        css = (GUIDE_ROOT / "assets" / "styles.css").read_text(encoding="utf-8")
        self.assertNotRegex(css, r"url\(\s*['\"]?https?://")
        self.assertIn("@media (prefers-reduced-motion: reduce)", css)
        self.assertIn("@media print", css)

    def test_required_workflows_exist(self):
        required = {
            "identify-password-problem",
            "windows-will-not-boot",
            "choose-live-environment",
            "decide-backup",
            "prepare-wipe",
            "clean-install-windows",
            "diagnose-unstable",
            "recover-files",
            "disk-layout",
            "medicat-not-working",
            "not-sure",
        }
        ids = {guide["id"] for guide in self.guides}
        self.assertTrue(required.issubset(ids))
        self.assertEqual(len(ids), len(self.guides), "duplicate guide IDs")

    def test_guided_intake_covers_jobs_without_promoting_helper_pages(self):
        guide_ids = {guide["id"] for guide in self.guides}
        questions = {question["id"]: question for question in self.intake["questions"]}
        self.assertEqual(
            set(self.intake["coreQuestionIds"]),
            {"job", "target", "authority", "preservation", "identity"},
        )
        self.assertTrue(set(self.intake["coreQuestionIds"]).issubset(questions))

        routed_guides = {option["guide"] for option in questions["job"]["options"]}
        self.assertEqual(routed_guides, guide_ids - {"choose-live-environment"})
        self.assertEqual(set(self.intake["branchQuestions"]), guide_ids)
        self.assertEqual(len(questions["job"]["options"]), 10)
        self.assertEqual(
            {option["id"] for option in questions["job"]["options"]},
            {"sign-in", "boot", "unstable", "files", "backup", "install", "wipe", "disk", "medicat", "unsure"},
        )
        for option in questions["job"]["options"]:
            self.assertEqual(option.get("questionIds", ["job"])[0], "job")
            self.assertTrue(set(option.get("questionIds", self.intake["coreQuestionIds"])).issubset(questions))
        app = (GUIDE_ROOT / "assets" / "app.js").read_text(encoding="utf-8")
        self.assertIn("data-start-job", app)

    def test_each_intake_branch_has_actionable_outputs(self):
        valid_statuses = {"ready", "caution", "stop"}
        branch_ids = []
        for guide_id, question in self.intake["branchQuestions"].items():
            branch_ids.append(question["id"])
            option_ids = [option["id"] for option in question["options"]]
            self.assertEqual(
                len(option_ids), len(set(option_ids)), f"duplicate options in {guide_id}"
            )
            for option in question["options"]:
                with self.subTest(guide=guide_id, option=option["id"]):
                    self.assertIn(option["status"], valid_statuses)
                    self.assertTrue(option["finding"])
                    self.assertTrue(option["next"])
                    self.assertTrue(option["avoid"])
                    self.assertTrue(option["ignore"])
                    if option.get("nextGuide"):
                        self.assertIn(option["nextGuide"], {guide["id"] for guide in self.guides})
        self.assertEqual(len(branch_ids), len(set(branch_ids)), "duplicate branch IDs")

    def test_password_module_routes_every_sign_in_branch(self):
        paths = self.password["paths"]
        ids = {path["id"] for path in paths}
        sign_in = self.intake["branchQuestions"]["identify-password-problem"]
        branch_ids = {option["id"] for option in sign_in["options"]}
        self.assertEqual(len(ids), len(paths), "duplicate password paths")
        self.assertTrue(branch_ids.issubset(ids))
        self.assertIn("protected-data", ids)
        for path in paths:
            with self.subTest(path=path["id"]):
                for field in ("label", "clue", "first", "steps", "medicat", "stop", "verify", "sources"):
                    self.assertTrue(path[field], f"{path['id']} missing {field}")
                self.assertTrue(all(source["url"].startswith("https://") for source in path["sources"]))
        index = (GUIDE_ROOT / "index.html").read_text(encoding="utf-8")
        app = (GUIDE_ROOT / "assets" / "app.js").read_text(encoding="utf-8")
        self.assertIn('src="data/password.js?', index)
        self.assertIn('data-route="password"', index)
        self.assertIn('route.indexOf("password=")', app)

    def test_lockpick_lessons_are_plain_language_and_routed(self):
        programs = self.password["programs"]
        self.assertEqual([program["name"] for program in programs], [
            "FastBoot Detect", "Reset Hibernation (Hybrid Sleep)",
            "Windows Login Unlocker", "Bypass Windows Password", "PCUnlocker",
            "Windows Password Reset", "Reset Windows Password", "Active@ Password Changer",
            "O&O BlueCon UserManager", "ntpwedit", "PEPassPass",
            "LazeSoft Windows Password Recovery", "WBG Password Recovery",
            "SQL Server Password Changer",
        ])
        self.assertEqual(len({program["id"] for program in programs}), len(programs))
        self.assertEqual(programs[5]["version"], "5.1")
        self.assertTrue(programs[6]["version"].startswith("9.3.0"))
        for program in programs:
            with self.subTest(program=program["id"]):
                for field in ("name", "version", "group", "summary", "useWhen", "evidence"):
                    self.assertTrue(program[field], f"{program['id']} missing {field}")
                if program.get("steps"):
                    self.assertTrue(program.get("stopPlain"))
                    self.assertTrue(program.get("check"))
                else:
                    self.assertTrue(program.get("next"))
                if program.get("source"):
                    self.assertTrue(program["source"].startswith("https://"))
                reader_copy = " ".join(
                    str(program.get(field, ""))
                    for field in ("name", "summary", "useWhen", "steps", "next", "stopPlain", "check")
                ).lower()
                for term in ("photo", "write effect", "sam database", "dpapi", "efs"):
                    self.assertNotIn(term, reader_copy, f"{program['id']} exposes {term}")
        self.assertEqual(len(self.password["environment"]), 3)
        index = (GUIDE_ROOT / "index.html").read_text(encoding="utf-8")
        app = (GUIDE_ROOT / "assets" / "app.js").read_text(encoding="utf-8")
        self.assertIn('data-route="lockpick"', index)
        self.assertIn('route.indexOf("lockpick=")', app)
        self.assertIn('lockpick-choices', app)
        self.assertNotIn('Know the write effect', app)
        self.assertNotIn('program.evidence', app)

    def test_intake_is_session_only_and_has_explicit_reset(self):
        app = (GUIDE_ROOT / "assets" / "app.js").read_text(encoding="utf-8")
        index = (GUIDE_ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn("window.sessionStorage.setItem", app)
        self.assertIn("window.sessionStorage.removeItem", app)
        self.assertNotIn("window.localStorage", app)
        self.assertIn("data-intake-reset", app)
        self.assertIn('data-route="intake"', index)
        self.assertIn('src="data/intake.js?', index)
        self.assertNotIn('data-intake="', index)

    def test_each_workflow_has_required_teaching_sections(self):
        required_kinds = {
            "recommended",
            "explain",
            "skip",
            "attention",
            "stop",
            "success",
            "failure",
            "understand",
            "advanced",
        }
        for guide in self.guides:
            with self.subTest(guide=guide["id"]):
                self.assertTrue(guide["goalPrompt"])
                self.assertIn(guide["risk"], {"low", "medium", "high"})
                self.assertTrue(guide["evidenceStatus"])
                self.assertTrue(guide["tags"])
                sections = guide["sections"]
                kinds = {section["kind"] for section in sections}
                self.assertTrue(required_kinds.issubset(kinds))
                section_ids = [section["id"] for section in sections]
                self.assertEqual(len(section_ids), len(set(section_ids)))
                for section in sections:
                    self.assertTrue(section["title"])
                    self.assertTrue(section["label"])

    def test_destructive_workflows_include_identity_and_target_language(self):
        destructive = {
            "identify-password-problem",
            "windows-will-not-boot",
            "prepare-wipe",
            "clean-install-windows",
            "recover-files",
            "disk-layout",
        }
        for guide in self.guides:
            if guide["id"] not in destructive:
                continue
            content = json.dumps(guide).lower()
            with self.subTest(guide=guide["id"]):
                self.assertRegex(content, r"target|installation|account")
                self.assertRegex(content, r"authoriz|owner|permission")
                self.assertRegex(content, r"stop")
                self.assertRegex(content, r"success|worked|verify|confirm")

    def test_related_guide_references_resolve(self):
        ids = {guide["id"] for guide in self.guides}
        for guide in self.guides:
            for related in guide.get("related", []):
                self.assertIn(related, ids, f"{guide['id']} links to missing {related}")

    def test_tool_and_glossary_ids_are_unique(self):
        tool_ids = [tool["id"] for tool in self.tools]
        terms = [entry["term"].casefold() for entry in self.glossary]
        self.assertEqual(len(tool_ids), len(set(tool_ids)))
        self.assertEqual(len(terms), len(set(terms)))
        self.assertEqual(len(self.tools), 282)
        self.assertEqual(sum(len(tool["locations"]) for tool in self.tools), 295)
        self.assertEqual(sum(bool(tool.get("lesson")) for tool in self.tools), 12)
        self.assertEqual(sum(tool["kind"] == "Boot menu image" for tool in self.tools), 38)
        for tool in self.tools:
            self.assertTrue(tool["name"])
            self.assertTrue(tool["purpose"])
            self.assertTrue(tool["location"])
            self.assertIn(tool["location"], tool["locations"])
            self.assertIn(tool["kind"], {"Windows program", "Boot menu image"})
            self.assertTrue(tool["status"])
            self.assertTrue(tool["versionEvidence"])
            if tool.get("lesson"):
                for key in ("when", "first", "steps", "stop", "verify", "source"):
                    self.assertTrue(tool["lesson"][key], f"{tool['name']} missing {key}")
        app = (GUIDE_ROOT / "assets" / "app.js").read_text(encoding="utf-8")
        self.assertIn('route.indexOf("tool=")', app)
        self.assertIn('id=\\"tool-results\\"', app)

    def test_no_defender_workflow_or_automatic_scanner_action(self):
        runtime_content = "\n".join(
            [
                (GUIDE_ROOT / "index.html").read_text(encoding="utf-8"),
                (GUIDE_ROOT / "assets" / "app.js").read_text(encoding="utf-8"),
                (GUIDE_ROOT / "data" / "guides.js").read_text(encoding="utf-8"),
                (GUIDE_ROOT / "data" / "tools.js").read_text(encoding="utf-8"),
                (GUIDE_ROOT / "data" / "intake.js").read_text(encoding="utf-8"),
                (GUIDE_ROOT / "data" / "password.js").read_text(encoding="utf-8"),
            ]
        )
        self.assertNotIn("Microsoft Defender", runtime_content)
        self.assertNotRegex(runtime_content, r"--(?:remove|move|copy)\b")

    def test_menu_tip_drafts_are_short_single_line_and_unresolved(self):
        data = json.loads((VENTOY_ROOT / "menu-tips.json").read_text(encoding="utf-8"))
        self.assertEqual(data["status"], "prototype-only-do-not-deploy")
        ids = [tip["id"] for tip in data["tips"]]
        self.assertEqual(len(ids), len(set(ids)))
        for tip in data["tips"]:
            with self.subTest(tip=tip["id"]):
                self.assertLessEqual(len(tip["tip"]), 140)
                self.assertNotRegex(tip["tip"], r"[\r\n]")
                self.assertTrue(tip["pathHint"].endswith("pending"))

    def test_f6_draft_is_inert_and_marked_do_not_deploy(self):
        cfg = (VENTOY_ROOT / "start-here.cfg").read_text(encoding="utf-8")
        self.assertIn("DO NOT DEPLOY", cfg)
        self.assertIn("VTOY_RET", cfg)
        self.assertNotRegex(
            cfg,
            r"(?im)^\s*(?:linux|linuxefi|initrd|initrdefi|chainloader|configfile|set\s+root|search)\b",
        )


if __name__ == "__main__":
    unittest.main()
