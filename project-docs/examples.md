# Examples: Using zsh-smart-insert

This document demonstrates how to use the `zsh-smart-insert` plugin in practical scenarios for boosting file interaction productivity in the terminal.

---

## 📂 Scenario 1: Open a File with a Command Prefix

### Scenario 1 - Steps

1. Press `Alt+f` to launch the file picker using `fd`.
2. Browse and select a file (e.g., `main.go`).
3. Choose a prefix command when prompted (e.g., `vim`).

### Scenario 1 - Result

```zsh
vim ./internal/main.go
```

The full command is inserted into your terminal buffer, ready for execution.

---

## 🔍 Scenario 2: Search for a File by Name

### Scenario 2 - Steps

1. Press `Alt+g` to search filenames using `ripgrep`.
2. Type a partial name (e.g., `readme`).
3. Select the desired file.
4. Choose a command like `bat` or `less`.

### Scenario 2 - Result

```zsh
bat ./README.md
```

---

## 🧠 Scenario 3: Search for a File by Content

### Scenario 3 - Steps

1. Press `Alt+s` to search inside file contents.
2. Type a keyword (e.g., `choose_prefix`).
3. Select a matching file from the preview.
4. Choose a prefix like `code` or `vim`.

### Scenario 3 - Result

```zsh
code ./functions/choose_prefix.zsh
```

---

## ➕ Scenario 4: Insert File Path Without a Prefix

### Scenario 4 - Steps

1. Launch any widget (`Alt+f`, `Alt+g`, or `Alt+s`).
2. Select the desired file.
3. When prompted, choose the empty prefix option.

### Scenario 4 - Result

```zsh
./project-docs/shortcuts.md
```

This is useful when scripting or composing custom shell commands.

---

## Tips

- Use `Ctrl+/` to toggle the file preview inside FZF.
- Use `ESC` or `Ctrl+C` to cancel the widget interface without inserting anything.
- Prefix options include: `cat`, `vim`, `less`, `bat`, `code`, or no prefix.

_Last updated: 2025-04-19_
