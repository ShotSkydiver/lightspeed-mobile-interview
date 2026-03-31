#!/bin/bash

# Script to create submission zip for take-home interview
# Run this script when you're ready to submit your completed work
#
# Usage:
#   ./create-submission-zip.sh              # Uses git user.name
#   ./create-submission-zip.sh "Your Name"  # Uses provided name
#
# Output: mobile-interview-takehome-submission-yourname.zip

set -e

echo "================================================"
echo "Creating Interview Submission Zip"
echo "================================================"
echo ""

# Check if .git directory exists
if [ ! -d ".git" ]; then
    echo "❌ ERROR: .git directory not found!"
    echo ""
    echo "The .git directory is required for submission so we can review your commit history."
    echo ""
    echo "Possible causes:"
    echo "  - You're running this script from the wrong directory"
    echo "  - The .git directory was accidentally deleted"
    echo "  - The project was not properly initialized with git"
    echo ""
    echo "Please ensure you're in the project root directory and that git is initialized."
    echo ""
    exit 1
fi

# Check if there are any commits
if ! git log -1 > /dev/null 2>&1; then
    echo "❌ ERROR: No git commits found!"
    echo ""
    echo "You need to make commits as you work on the assignment."
    echo "Your commit history will be reviewed as part of the evaluation."
    echo ""
    echo "Quick start:"
    echo "  git add <files>"
    echo "  git commit -m \"Descriptive message\""
    echo ""
    echo "See GIT_WORKFLOW.md for detailed instructions."
    echo ""
    exit 1
fi

# Check for uncommitted changes (warning only, not blocking)
if ! git diff-index --quiet HEAD 2>/dev/null; then
    echo "⚠️  WARNING: You have uncommitted changes!"
    echo ""
    echo "The following files have changes that are not committed:"
    git status --short
    echo ""
    echo "Consider committing these changes before creating your submission."
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Submission cancelled. Please commit your changes and try again."
        exit 1
    fi
    echo ""
fi

# Get the directory name
DIR_NAME=$(basename "$PWD")

# Determine name for filename (priority: CLI arg > git config > none)
if [ -n "$1" ]; then
    # Use provided command line argument
    USER_NAME=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
    ZIP_NAME="${DIR_NAME}-submission-${USER_NAME}.zip"
    echo "📝 Using provided name: $1"
elif git config user.name > /dev/null 2>&1; then
    # Use git user.name
    GIT_USER_NAME=$(git config user.name)
    USER_NAME=$(echo "$GIT_USER_NAME" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
    ZIP_NAME="${DIR_NAME}-submission-${USER_NAME}.zip"
    echo "📝 Using git user.name: $GIT_USER_NAME"
    echo "   (You can override with: ./create-submission-zip.sh \"Your Name\")"
else
    # No name available
    ZIP_NAME="${DIR_NAME}-submission.zip"
    echo "⚠️  WARNING: No name provided and git user.name not set"
    echo "   Usage: ./create-submission-zip.sh \"Your Name\""
    echo "   Or set git config: git config user.name \"Your Name\""
fi
echo ""

# Remove old zip if exists
if [ -f "$ZIP_NAME" ]; then
    echo "⚠️  Removing existing $ZIP_NAME"
    rm "$ZIP_NAME"
fi

# Create temporary directory for zip contents
TEMP_DIR=$(mktemp -d)
TEMP_PROJECT="$TEMP_DIR/$DIR_NAME"

echo "📦 Preparing submission files..."

# Copy project to temp directory, excluding large/unnecessary files
rsync -a --exclude='node_modules' \
         --exclude='.claude' \
         --exclude='.expo' \
         --exclude='.idea' \
         --exclude='.vscode' \
         --exclude='.gradle' \
         --exclude='.cxx' \
         --exclude='dist' \
         --exclude='build' \
         --exclude='web-build' \
         --exclude='coverage' \
         --exclude='.cache' \
         --exclude='.DS_Store' \
         --exclude='.env' \
         --exclude='.env.local' \
         --exclude='*.log' \
         --exclude='*.iml' \
         --exclude='*.jsbundle' \
         --exclude='*.swp' \
         --exclude='*.swo' \
         --exclude='local.properties' \
         --exclude='*-submission.zip' \
         --exclude="$ZIP_NAME" \
         ./ "$TEMP_PROJECT/"

# Create zip from temp directory
echo "📦 Creating zip file: $ZIP_NAME"
cd "$TEMP_DIR"
zip -r "$PWD/../$ZIP_NAME" "$DIR_NAME/" > /dev/null
cd - > /dev/null

# Move zip to current directory
mv "$TEMP_DIR/../$ZIP_NAME" "$ZIP_NAME"

# Cleanup temp directory
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Created: $ZIP_NAME"
echo ""

# Show zip contents summary
echo "📋 Zip contents summary:"
unzip -l "$ZIP_NAME" | head -20
echo "..."
echo ""

# Verify .git is included
if unzip -l "$ZIP_NAME" | grep -q "\.git/"; then
    echo "✅ .git directory is included"
else
    echo "❌ WARNING: .git directory NOT included!"
fi

echo ""

# Show zip size
ZIP_SIZE=$(du -h "$ZIP_NAME" | cut -f1)
echo "📊 Zip file size: $ZIP_SIZE"

echo ""
echo "================================================"
echo "✅ Submission ready!"
echo "================================================"
echo ""
echo "📧 Submit this file:"
echo "   $ZIP_NAME"
echo ""
