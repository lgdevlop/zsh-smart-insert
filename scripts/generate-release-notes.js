#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const changesetDir = path.join(__dirname, '../.changeset');
const pkg = require('../package.json');

function getChangesetFiles() {
  return fs.readdirSync(changesetDir)
    .filter(file => file.endsWith('.md') && file !== 'README.md')
    .map(file => path.join(changesetDir, file));
}

function parseChangeset(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n"([^"]+)": (\w+)\n---\n\n([\s\S]+)/);
  if (!match) return null;
  return {
    packageName: match[1],
    type: match[2],
    message: match[3].trim(),
  };
}

function getLastEffectiveTag() {
  try {
    execSync('git describe --tags --exact-match', { stdio: 'pipe' });
    return execSync('git describe --tags --abbrev=0 HEAD^', { encoding: 'utf-8' }).trim();
  } catch {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
  }
}

function getGitCommitsSinceTag(tag) {
  try {
    const output = execSync(`git log ${tag}..HEAD --pretty=format:"%s | %an"`, { encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean).map(line => {
      const [message, author] = line.split(' | ');
      return { message: message.trim(), author: author?.trim() };
    });
  } catch (e) {
    return [{ message: 'Initial release', author: '' }];
  }
}

function getChangedFilesSinceTag(tag) {
  try {
    const output = execSync(`git diff --name-only ${tag}..HEAD`, { encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean).sort();
  } catch (e) {
    return ['zsh-smart-insert.plugin.zsh'];
  }
}

function groupCommits(commits) {
  const grouped = { feat: [], fix: [], misc: [] };

  for (const { message, author } of commits) {
    const line = `- ${message}${author ? ` _(by ${author})_` : ''}`;
    if (message.startsWith('feat:') || message.startsWith('feat(')) {
      grouped.feat.push(line);
    } else if (message.startsWith('fix:') || message.startsWith('fix(')) {
      grouped.fix.push(line);
    } else {
      grouped.misc.push(line);
    }
  }

  return grouped;
}

function groupFilesByDirectory(files) {
  const grouped = {};

  for (const file of files) {
    const [dir, ...rest] = file.split('/');
    const name = rest.length ? rest.join('/') : dir;
    const key = rest.length ? dir : '.';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(name);
  }

  return Object.fromEntries(
    Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dir, items]) => [dir, items.sort((a, b) => a.localeCompare(b))])
  );
}

function generateNotes({ version, type, grouped, changedFiles, commits }) {
  const heading = `## ✨ zsh-smart-insert v${version}`;
  const subtitle = type === 'major' ? '\n\n🚀 First major release of the plugin!' : '';

  const sections = [];
  if (grouped.feat.length) {
    sections.push(`\n\n#### 🚀 Features\n\n${grouped.feat.join('\n')}`);
  }
  if (grouped.fix.length) {
    sections.push(`\n\n#### 🐛 Fixes\n\n${grouped.fix.join('\n')}`);
  }
  if (grouped.misc.length) {
    sections.push(`\n\n#### 🛠️ Other Improvements\n\n${grouped.misc.join('\n')}`);
  }

  const fileGroups = groupFilesByDirectory(changedFiles);
  const fileSection = Object.entries(fileGroups).map(([dir, files]) => {
    const count = files.length;
    const label = dir === '.' ? './' : `${dir}/`;
    const heading = `\n\n#### 📁 ${label} (${count} file${count > 1 ? 's' : ''})`;
    const lines = files.map(f => `- \`${f}\``).join('\n');
    return `${heading}\n${lines}`;
  }).join('');

  const uniqueAuthors = Array.from(new Set(commits.map(c => c.author).filter(Boolean))).sort();
  const authorsNote = uniqueAuthors.length
    ? `Made with ❤️ by ${uniqueAuthors.join(', ')}`
    : 'Made with ❤️ by Leonardo Gomes';

  return `${heading}${subtitle}\n\n---\n\n### ✅ Highlights${sections.join('')}\n\n---\n\n### 📂 Key Files Changed${fileSection}\n\n---\n\nFeel free to contribute or open issues. 💚\n\n${authorsNote}\n`;
}

function main() {
  const files = getChangesetFiles();
  if (!files.length) return console.error('❌ No changeset file found.');

  const parsed = parseChangeset(files[0]);
  if (!parsed) return console.error('❌ Failed to parse changeset.');

  const version = pkg.version.startsWith('0.0.0') ? '1.0.0' : pkg.version;
  const tag = getLastEffectiveTag();
  const commits = getGitCommitsSinceTag(tag);
  const grouped = groupCommits(commits);
  const changedFiles = getChangedFilesSinceTag(tag);

  const notes = generateNotes({ version, type: parsed.type, grouped, changedFiles, commits });
  const outputFile = path.join(__dirname, `../.github/release-notes/${version}.md`);
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, notes);
  console.log(`✅ Release notes written to ${outputFile}`);
}

main();
