#!/usr/bin/env node

/**
 * ✅ Functional Requirements Addressed by This Script:
 *
 * 1. Detects the latest valid Git tag to determine the starting point for comparison.
 * 2. Lists all commits made since the last effective tag (or all commits if no tag exists).
 * 3. Groups commits by type using conventional commit prefixes (feat, fix, misc).
 * 4. Determines the release type (major, minor, patch, misc) based on commit types and semantic versioning rules.
 * 5. Retrieves all files modified since the last tag or, if no tag exists, all versioned files.
 * 6. Groups modified files by their base directory and sorts them alphabetically.
 * 7. Generates a release notes Markdown file containing:
 *    - Title and subtitle based on release type
 *    - Grouped commit highlights (features, fixes, misc)
 *    - Modified files grouped by directory
 *    - List of unique authors, excluding bots
 * 8. Handles the special case of version 1.0.0 with a distinct subtitle.
 * 9. Creates the output directory recursively if it doesn't exist.
 * 10. Saves the generated release notes in `.github/release-notes/<version>.md`.
 *
 * 🔧 Utility: Automates structured release notes generation based on Git history, supporting custom commit formats and semantic versioning.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pkg = require('../package.json');

// ✅ Attempts to retrieve the latest valid tag or returns null
function getLastEffectiveTag() {
  try {
    execSync('git describe --tags --exact-match', { stdio: 'pipe' });
    try {
      return execSync('git describe --tags --abbrev=0 HEAD^', { encoding: 'utf-8' }).trim();
    } catch {
      return null;
    }
  } catch {
    try {
      return execSync('git describe --tags --abbrev=0', { encoding: 'utf-8' }).trim();
    } catch {
      return null;
    }
  }
}

// ✅ Lists commits since the last tag
function getGitCommitsSinceTag(tag) {
  try {
    // Builds the appropriate git command:
    // If a tag exists, lists commits between the tag and the current HEAD
    // Otherwise, lists all commits in the repository
    const cmd = tag
      ? `git log ${tag}..HEAD --pretty=format:"%s | %an"`
      : `git log --pretty=format:"%s | %an"`;

    // Executes the command and captures the output as plain text
    const output = execSync(cmd, { encoding: 'utf-8' });

    return output
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [message, author] = line.split(' | ');

        return { message: message.trim(), author: author?.trim() };
      });
  } catch {
    // In case of error (e.g., empty repository), returns a default commit
    return [{ message: 'Initial release', author: '' }];
  }
}

// ✅ Lists files changed since the last tag (or all files in the repo)
function getChangedFilesSinceTag(tag) {
  try {
    // If a tag exists, shows the files changed from that tag to HEAD
    // Otherwise, lists all versioned files in the repository
    const cmd = tag ? `git diff --name-only ${tag}..HEAD` : `git ls-files`;

    const output = execSync(cmd, { encoding: 'utf-8' });

    return output.trim().split('\n').filter(Boolean).sort();
  } catch {
    // In case of error, returns a default value as a fallback
    return ['zsh-smart-insert.plugin.zsh'];
  }
}

// ✅ Groups commits into categories: feat, fix, and misc
function groupCommits(commits) {
  const grouped = { feat: [], fix: [], misc: [] };

  for (const { message, author } of commits) {
    const match = message.match(/^\p{Emoji_Presentation}?\s*(\w+)(\([\w-]+\))?:/u);
    const type = match?.[1];

    const line = `- ${message}${author && author !== 'github-actions[bot]' ? ` _(by ${author})_` : ''}`;

    if (type === 'feat') {
      grouped.feat.push(line);
    } else if (type === 'fix') {
      grouped.fix.push(line);
    } else {
      grouped.misc.push(line);
    }
  }

  return grouped;
}

// ✅ Groups files by base directory
function groupFilesByDirectory(files) {
  const grouped = {};

  for (const file of files) {
    // Splits the file path into parts using '/' as the separator
    const [dir, ...rest] = file.split('/');

    // If there is a subpath after the directory, joins the remaining segments; otherwise, uses the original name
    const name = rest.length ? rest.join('/') : dir;

    // Uses the directory name as the grouping key; if it's a root-level file, uses '.'
    const key = rest.length ? dir : '.';

    // If there's no array for this directory yet, creates one
    if (!grouped[key]) grouped[key] = [];

    // Adds the file name to the corresponding array
    grouped[key].push(name);
  }

  // Converts the object to a Map sorted by directories and files, then returns it as a plain object
  return Object.fromEntries(
    Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b)) // Sorts the directories in alphabetical order
      .map(([dir, items]) => [dir, items.sort((a, b) => a.localeCompare(b))]) // Sorts the files within each directory
  );
}

/**
 * Returns a subtitle message based on the release type.
 *
 * - If the current version is '1.0.0', returns a special message for the initial major release.
 * - Otherwise, returns a descriptive subtitle corresponding to the release type:
 *   - 'major' → significant changes or architectural updates
 *   - 'minor' → new features or enhancements
 *   - 'patch' → bug fixes or minor improvements
 *   - 'misc'  → internal changes like refactoring or documentation
 *
 * @param {string} type - The release type ('major', 'minor', 'patch', or 'misc').
 * @returns {string} A Markdown-formatted subtitle to include in the release notes.
 */
function getSubtitleByType(type) {
  const version = pkg.version;

  if (version === '1.0.0') {
    console.log('version', version)
    return '\n\n🚀 Initial major release of the plugin!';
  }

  switch (type) {
    case 'major':
      return '\n\n🚀 Major update — introduces significant changes or new architecture';
    case 'minor':
      return '\n\n✨ Feature release — brings new enhancements or capabilities';
    case 'patch':
      return '\n\n🛠️ Maintenance update — includes bug fixes or minor improvements';
    case 'misc':
    default:
      return '\n\n📦 Internal update — refactors, docs or non-functional changes';
  }
}

// ✅ Generates the Markdown content for the release note
function generateNotes({ version, type, grouped, changedFiles, commits }) {
  const heading = `## ✨ zsh-smart-insert v${version}`; // Release note title with version number
  // const subtitle = type === 'major' ? '\n\n🚀 First major release of the plugin!' : ''; // Subtitle for major-type releases
  const subtitle = getSubtitleByType(type);

  const sections = []; // Array to store content blocks by commit type

  if (grouped.feat.length) {
    // If there are features, adds a features section
    sections.push(`\n\n#### 🚀 Features\n\n${grouped.feat.join('\n')}`);
  }
  if (grouped.fix.length) {
    // If there are fixes, adds a bug fixes section
    sections.push(`\n\n#### 🐛 Fixes\n\n${grouped.fix.join('\n')}`);
  }
  if (grouped.misc.length) {
    // If there are miscellaneous improvements, adds a generic section
    sections.push(`\n\n#### 🛠️ Other Improvements\n\n${grouped.misc.join('\n')}`);
  }

  const fileGroups = groupFilesByDirectory(changedFiles);
  const fileSection = Object.entries(fileGroups).map(([dir, files]) => {
    const count = files.length;
    const label = dir === '.' ? './' : `${dir}/`;
    const heading = `\n\n#### 📁 ${label} (${count} file${count > 1 ? 's' : ''})\n`;
    const lines = files.map(f => `- \`${f}\``).join('\n');
    return `${heading}\n${lines}`;
  }).join('');

  const uniqueAuthors = Array.from(new Set(
    commits.map(c => c.author).filter(name => name && name !== 'github-actions[bot]')
  )).sort();
  const authorsNote = uniqueAuthors.length
    ? `Made with ❤️ by ${uniqueAuthors.join(', ')}`
    : 'Made with ❤️ by Leonardo Gomes';

  return `${heading}${subtitle}\n\n---\n\n### ✅ Highlights${sections.join('')}\n\n---\n\n### 📂 Key Files Changed${fileSection}\n\n---\n\nFeel free to contribute or open issues. 💚\n\n${authorsNote}\n`;
}

/**
 * Checks if the current version from package.json is a full major release
 * Example: 1.0.0, 2.0.0... (must not contain non-zero minor or patch)
 *
 * @returns {boolean}
 */
function isFullMajorRelease() {
  const version = pkg.version;

  if (!version) {
    return '';
  }

  const [major, minor, patch] = version.split('.').map(Number);

  // Check if it's a full major version (e.g., 1.0.0, 2.0.0)
  return major > 0 && minor === 0 && patch === 0;
}

/**
 * Determines the type of release based on the grouped commits.
 *
 * - Returns 'major' if the release is marked as a full major release.
 * - Returns 'minor' if there are any 'feat' (feature) commits.
 * - Returns 'patch' if there are any 'fix' (bug fix) commits.
 * - Returns 'misc' if none of the above types are present.
 *
 * @param {Object} grouped - An object containing arrays of commits grouped by type (e.g., feat, fix).
 * @returns {string} The determined release type: 'major', 'minor', 'patch', or 'misc'.
 */
function getType(grouped) {
  const isFullMajor = isFullMajorRelease()

  if (isFullMajor) {
    return 'major'
  }

  if (grouped.feat.length) {
    return 'minor'
  }

  if (grouped.fix.length) {
    return 'patch'
  }

  return 'misc'
}

// ✅ Main function of the script
function main() {
  const version = pkg.version.startsWith('0.0.0') ? '1.0.0' : pkg.version;
  const tag = getLastEffectiveTag();
  const commits = getGitCommitsSinceTag(tag);
  const grouped = groupCommits(commits);
  const changedFiles = getChangedFilesSinceTag(tag);
  const type = getType(grouped)

  const notes = generateNotes({ version, type, grouped, changedFiles, commits });
  const outputFile = path.join(__dirname, `../.github/release-notes/${version}.md`);
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, notes);
  console.log(`✅ Release notes written to ${outputFile}`);
}

main();
