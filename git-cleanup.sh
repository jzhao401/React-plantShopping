#!/bin/bash
# Script to remove .gitignore-matched files from Git history
# Run in project root: ./remove_ignored.sh
# Backup repo first!

# Step 1: List all unique files in history
git log --pretty=format: --name-only --diff-filter=AMR | sort -u | grep -v '^$' > all_files.txt

# Step 2: Filter ignored files
> ignored_files.txt
while IFS= read -r file; do
  if git check-ignore -q "$file"; then
    echo "$file" >> ignored_files.txt
  fi
done < all_files.txt

# Step 3: Rewrite history
git filter-repo --paths-from-file ignored_files.txt --invert-paths --force

# Cleanup
rm all_files.txt ignored_files.txt

echo "History rewritten. Force-push with: git push --all --force (coordinate with team)."
