#!/usr/bin/env zsh

set -e

PLUGIN_NAME="zsh-smart-insert"
PLUGIN_FILE="zsh-smart-insert.plugin.zsh"
INSTALL_DIR="$HOME/.${PLUGIN_NAME}"
ZSHRC="$HOME/.zshrc"

print_info() {
  echo -e "\033[1;34m[INFO]\033[0m $1"
}

print_success() {
  echo -e "\033[1;32m[SUCCESS]\033[0m $1"
}

print_warning() {
  echo -e "\033[1;33m[WARNING]\033[0m $1"
}

print_error() {
  echo -e "\033[1;31m[ERROR]\033[0m $1"
}

print_info "Installing to $INSTALL_DIR..."
mkdir -p "$INSTALL_DIR"
git clone https://github.com/lgdevlop/$PLUGIN_NAME.git "$INSTALL_DIR"

print_info "Checking dependencies..."
for cmd in fzf rg fd bat; do
  if ! command -v $cmd > /dev/null 2>&1; then
    print_warning "Missing dependency: $cmd"
  else
    echo "[OK] Found: $cmd"
  fi
done

print_info "How do you want to load the plugin?"
echo "1) Manual (.zshrc source)"
echo "2) Oh My Zsh (plugins array)"
echo "3) Zinit"
echo "4) Antigen"
echo "5) Skip"
read -p "Select [1-5]: " method

case $method in
  1)
    if ! grep -q "$PLUGIN_FILE" "$ZSHRC"; then
      echo "source $INSTALL_DIR/$PLUGIN_FILE" >> "$ZSHRC"
      print_success "Added to .zshrc"
    else
      print_warning "Already in .zshrc"
    fi
    ;;
  2|3|4)
    print_info "Use your plugin manager to load: $PLUGIN_NAME"
    ;;
  *)
    print_warning "No changes made to .zshrc"
    ;;
esac

print_success "Installation complete. Use Alt+F to get started."
