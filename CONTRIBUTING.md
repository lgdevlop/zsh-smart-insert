# Contributing to zsh-smart-insert

Thank you for your interest in contributing to **zsh-smart-insert**! 🎉

This project aims to improve Zsh productivity with file-aware command insertion using `fzf`, `fd`, and `ripgrep`, while keeping the experience ergonomic and extensible.

---

## 🚀 How to Contribute

1. **Fork** this repository
2. **Clone** your fork:

   ```bash
   git clone https://github.com/lgdevlop/zsh-smart-insert.git
   ```

3. **Create a new branch**:

   ```bash
   git checkout -b feature/my-contribution
   ```

4. **Make your changes**
5. **Submit a Pull Request** to the `main` branch

---

## 📂 Types of Contributions

We welcome contributions of all kinds:

- 🐛 Bug fixes
- ⚡ Performance or compatibility improvements
- 🧩 New search strategies or integrations
- 📝 Improvements to documentation or examples
- 🎮 UX enhancements and new keyboard shortcuts

---

## 🧪 Coding Standards

- Use idiomatic **Zsh syntax** for all plugin logic
- Comment code clearly in **English**
- Use descriptive variable names (e.g., `LBUFFER`, `prefix`, `selected_file`)
- Prefer readability and testability in logic
- Test widget behavior inside real interactive terminals

---

## ✅ Test Checklist

Before submitting your PR:

- [ ] The plugin loads without errors via `zsh-smart-insert.plugin.zsh`
- [ ] Widgets behave correctly (`Alt+f`, `Alt+g`, `Alt+s`)
- [ ] Prefix selection and path injection are functional
- [ ] Previews (`bat`) and live `fzf` reloads work as expected
- [ ] No new warnings or regressions in functionality

---

## 📦 Project Structure

```text
.
├── zsh-smart-insert.plugin.zsh       # Plugin entry point
├── internal/                         # Interactive widgets (fzf, rg, etc.)
├── functions/                        # Reusable utility functions
├── project-docs/                     # Markdown docs (examples, shortcuts)
├── install.sh                        # Interactive CLI installer
├── scripts/                          # Local automation (e.g., release notes)
├── Makefile                          # CLI tasks for install/test/reload
└── assets/                           # Optional logos or visual assets
```

---

## ✍️ Commit Guidelines

This project uses [Gitmoji Commit Workflow](https://github.com/arvinxx/gitmoji-commit-workflow).

Please refer to [`COMMITS.md`](./COMMITS.md) for types, emojis, and formatting rules.

Format:

```bash
✨ feat(scope): support plugin previews
```

---

## 🔐 Execution Permissions & Shebang Rules

To keep the repository clean and predictable, follow these rules regarding file permissions and shebang usage:

### ✅ Executable files (require `+x` and `shebang`)

| File                          | Shebang                    | Description                        |
|------------------------------|-----------------------------|------------------------------------|
| `install.sh`                 | `#!/usr/bin/env zsh`       | Interactive installer              |
| `scripts/*.js`               | Optional (`node` CLI)      | Node-based tooling (CI scripts)    |

### ❌ Non-executables (no `+x`, no shebang)

| File                          | Why                        |
|------------------------------|-----------------------------|
| `zsh-smart-insert.plugin.zsh`| Source-only plugin entry   |
| `functions/*.zsh`            | Utility shell functions    |
| `internal/*.zsh`             | Widget logic (`fzf_*`)     |
| `project-docs/*.md`          | Markdown documentation     |
| `.changeset/*.md`            | Versioning metadata        |

### 🛠 Recommended command to clean up permissions

```bash
# Remove +x from non-executable files
find functions internal project-docs .changeset -type f \( -name '*.zsh' -o -name '*.md' \) -exec chmod -x {} \;
chmod -x zsh-smart-insert.plugin.zsh

# Add +x to true executable scripts
chmod +x install.sh
chmod +x scripts/*.js
```

---

## 🛡️ Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md). By contributing, you agree to follow it.

---

Thank you for helping improve `zsh-smart-insert` 💚
