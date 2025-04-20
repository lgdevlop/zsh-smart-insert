# Commit Message Conventions

This project uses **semantic commits with Gitmoji prefixes** to improve clarity, consistency, and automation in version control.

We follow a format inspired by [Conventional Commits](https://www.conventionalcommits.org/) and [Gitmoji](https://gitmoji.dev), with the emoji placed **at the beginning** of the message.

---

## 🧩 Format

```bash
<emoji> type(scope): message
```

### ✅ Example

```bash
✨ feat(core): support plugin previews
```

---

## 🔠 Type Reference

| Type      | Purpose                                      | Emoji | Example                                                |
|-----------|----------------------------------------------|--------|---------------------------------------------------------|
| `feat`    | Add a new feature                            | ✨     | `✨ feat(api): add pagination support`                 |
| `fix`     | Bug fix                                      | 🐛     | `🐛 fix(router): handle null input`                   |
| `docs`    | Documentation update                         | 📝     | `📝 docs(README): update usage examples`              |
| `style`   | Code style change (no logic impact)          | 🎨     | `🎨 style(ui): unify spacing rules`                   |
| `refactor`| Code refactor (no feature/bug fix)           | ♻️     | `♻️ refactor(core): simplify config merging`          |
| `perf`    | Performance improvement                      | ⚡     | `⚡ perf(search): optimize loop conditions`           |
| `test`    | Add or update tests                          | ✅     | `✅ test(widget): add shortcut toggle test`           |
| `build`   | Build-related changes                        | 📦     | `📦 build(config): update to latest LTS Node`         |
| `ci`      | CI/CD changes (pipelines, workflows)         | 👷     | `👷 ci(actions): add lint and test stages`            |
| `chore`   | Other minor tasks (deps, tooling, cleanup)   | 🔧     | `🔧 chore(deps): remove unused libraries`             |
| `revert`  | Revert a previous commit                     | ⏪     | `⏪ revert(router): undo redirect logic`              |

---

## 📌 Scope Reference

| Scope        | Description                                                  |
|--------------|--------------------------------------------------------------|
| `README`     | Main project readme                                          |
| `plugin`     | Plugin entry file                                            |
| `shortcuts`  | Keyboard shortcut configuration                              |
| `examples`   | Usage examples and guides                                    |
| `widget`     | ZLE widget functions and interaction                         |
| `config`     | Configuration system or files                                |
| `functions`  | Utility functions used across widgets                        |
| `docs`       | Markdown files under `project-docs/`                         |
| `ci`         | GitHub Actions, CI setup                                     |
| `assets`     | Project logo, preview images, and visual assets             |

---

## 🚨 Breaking Changes

For breaking changes, include a note after the commit body:

```bash
💥 feat(core): drop support for legacy API

BREAKING CHANGE: This version is no longer compatible with v0 configs.
```

---

## ✅ Tips

- Use present tense: `add`, not `added`; `fix`, not `fixed`
- Keep messages under 100 characters if possible
- Be consistent with emoji and spacing

---

Happy committing! 🚀
