PLUGIN_NAME = zsh-smart-insert

.PHONY: help install uninstall check-deps reload

help:
	@echo "Usage: make [target]"
	@echo "  install       Install the plugin to ~/.zsh-smart-insert"
	@echo "  uninstall     Remove plugin directory"
	@echo "  check-deps    List required dependencies"
	@echo "  reload        Source your .zshrc"

install:
	@bash install.sh

uninstall:
	rm -rf $$HOME/.zsh-smart-insert
	@echo "[INFO] Plugin uninstalled"

check-deps:
	@echo "Checking for: fzf, fd, rg, bat"
	@for cmd in fzf fd rg bat; do \
		if ! command -v $$cmd >/dev/null 2>&1; then \
			echo "[MISSING] $$cmd"; \
		else \
			echo "[OK] $$cmd"; \
		fi \
	done

reload:
	@source ~/.zshrc || echo "Please reload your terminal manually."
