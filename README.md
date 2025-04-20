# zsh-smart-insert

<p align="center">
  <img src="assets/logo.png" alt="zsh-smart-insert Logo" width="200" />
</p>

<p align="center">
  <strong>Smart file search and insertion for Zsh ✨</strong><br>
  Insert file paths from fuzzy search directly into your command line.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg" alt="Contributions Welcome" />
  <img src="https://img.shields.io/badge/changelog-active-blue.svg" alt="Changelog Available" />
</p>

---

## 🔍 About

**zsh-smart-insert** is a Zsh plugin that provides interactive widgets to search for files and content using [`fd`](https://github.com/sharkdp/fd), [`rg`](https://github.com/BurntSushi/ripgrep), and [`fzf`](https://github.com/junegunn/fzf). It inserts the result directly into your shell with optional command prefixes.

- 📂 File path selection with preview via `fd` + `fzf`
- 🧠 Content search with reactive reload using `ripgrep`
- ⌨️ Prefix support (e.g. `vim`, `cat`, `less`, `code`)
- 🎨 Syntax-highlighted preview using `bat`

---

## ⚙️ Requirements

| Tool  | Purpose                                 | Link |
|-------|-----------------------------------------|------|
| [`fzf`](https://github.com/junegunn/fzf)   | Interactive fuzzy search             | [Link](https://github.com/junegunn/fzf) |
| [`fd`](https://github.com/sharkdp/fd)     | File system search                   | [Link](https://github.com/sharkdp/fd) |
| [`rg`](https://github.com/BurntSushi/ripgrep) | Content search engine         | [Link](https://github.com/BurntSushi/ripgrep) |
| [`bat`](https://github.com/sharkdp/bat)   | Preview with syntax highlighting     | [Link](https://github.com/sharkdp/bat) |

---

## 🚀 Installation

### Manual

```bash
git clone https://github.com/lgdevlop/zsh-smart-insert.git ~/.zsh-smart-insert
echo "source ~/.zsh-smart-insert/zsh-smart-insert.plugin.zsh" >> ~/.zshrc
source ~/.zshrc
```

### Zinit

```zsh
zinit light lgdevlop/zsh-smart-insert
```

### Antigen

```zsh
antigen bundle lgdevlop/zsh-smart-insert
```

### Oh My Zsh (manual plugin)

```bash
git clone https://github.com/lgdevlop/zsh-smart-insert.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-smart-insert
```

Then add to your `.zshrc`:

```zsh
plugins=(git zsh-smart-insert)
```

Reload with:

```zsh
omz reload   # if using Oh My Zsh
# or
source ~/.zshrc
```

---

## 💡 Usage

- `Alt+f` – Pick files by name with `fd`
- `Alt+g` – Search files by name with `rg`
- `Alt+s` – Search file content with live reload

Each result is inserted at the cursor with an optional prefix.

> Example: Select a file with `vim` as prefix → inserts `vim ./my/file.txt`

More examples in [`project-docs/examples.md`](./project-docs/examples.md)

---

## 🧩 Configuration

You can customize behavior with environment variables:

```zsh
# Custom prefix options (fzf menu)
export ZSH_SMART_INSERT_PREFIXES="nvim:less:code"

# Custom directories to ignore in fd/rg
export ZSH_SMART_INSERT_IGNOREDIRS=".git/*:node_modules/:dist/:.venv/"
```

---

## ⌨️ Shortcuts

| Key       | Action                            |
|-----------|------------------------------------|
| `Alt+f`   | Fuzzy file picker with preview     |
| `Alt+g`   | File name search with `rg`         |
| `Alt+s`   | Content search with live reload    |
| `Ctrl+/`  | Toggle preview in FZF              |

See [`project-docs/shortcuts.md`](./project-docs/shortcuts.md) for full reference.

---

## 📁 Project Structure

```text
.
├── zsh-smart-insert.plugin.zsh     # Plugin entry point
├── functions/                      # Reusable Zsh helpers
├── internal/                       # ZLE widgets (fzf search)
├── scripts/                        # Automation (e.g. release notes)
├── project-docs/                   # Docs: shortcuts, examples
├── .github/workflows/              # CI/CD pipelines
├── install.sh                      # Interactive installer
```

---

## 🛣️ Roadmap

- [x] Prefix selector with command injection
- [x] Search by name and content
- [x] Interactive previews with `bat`
- [x] Customizable prefixes and ignored paths
- [ ] Per-widget user customization (e.g. ignoredir by mode)
- [ ] Custom themes and per-widget configuration

---

## 📄 Related Docs

- [Examples](./project-docs/examples.md)
- [Keyboard Shortcuts](./project-docs/shortcuts.md)
- [Contributing Guide](./CONTRIBUTING.md)
- [Release Notes](./RELEASE-NOTES.md)

---

## 🤝 Contributing

Contributions are welcome! Open an issue or submit a pull request.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).

---

## 📄 License

MIT — See [`LICENSE`](./LICENSE).

---

## 👤 Author

Made with ❤️ by [Leonardo Gomes](https://github.com/lgdevlop)

---

<p align="center">
  <strong>✨ zsh-smart-insert — Insert smarter, search faster!</strong>
</p>
