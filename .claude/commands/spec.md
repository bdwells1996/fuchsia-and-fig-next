---
description: Create a feature spec file and branch from a short idea
argument-hint: "[Short feature description, optionally: 'figma: <component-link>']"
allowed-tools: Read, Write, Glob, Bash(git switch:*), Agent
---

You are helping to spin up a new feature spec for this application, from a short idea provided in the user input below. Always adhere to any rules or requirements set out in any CLAUDE.md files when responding.

User input: $ARGUMENTS

## High level behavior

Your job will be to turn the user input above into:

- A human friendly feature title in kebab-case (e.g. new-heist-form)
- A safe git branch name not already taken (e.g. claude/feature/new-heist-form)
- A detailed markdown spec file under the _specs/ directory

Then save the spec file to disk and print a short summary of what you did.

## Step 1. Check the current branch

Check the current Git branch, and abort this entire process if there are any uncommitted, unstaged, or untracked files in the working directory. Tell the user to commit or stash changes before proceeding, and DO NOT GO ANY FURTHER.

## Step 2. Parse the arguments

From `$ARGUMENTS`, extract:

1. `feature_title`  
   - A short, human readable title in Title Case.  
   - Example: "Card Component for Dashboard Stats".

2. `feature_slug`  
   - A git safe slug.  
   - Rules:  
     - Lowercase 
     - Kebab-case 
     - Only `a-z`, `0-9` and `-`  
     - Replace spaces and punctuation with `-`  
     - Collapse multiple `-` into one  
     - Trim `-` from start and end  
     - Maximum length 40 characters  
   - Example: `card-component` or `card-component-dashboard`.

3. `branch_name`  
   - Format: `claude/feature/<feature_slug>`  
   - Example: `claude/feature/card-component`.

4. `figma_hint` (optional)  
   - If `$ARGUMENTS` contains the substring `figma:`  
   - Then the text after `figma:` is the figma component link.  
   - Trim whitespace.  
   - Example input:  
     - `/spec Card component, figma: https://www.figma.com/design/some-link`  
     - `figma_hint` becomes `https://www.figma.com/design/some-link`.

If you cannot infer a sensible `feature_title` and `feature_slug`, ask the user to clarify instead of guessing.

## Step 2.5 Pull Figma context when needed

If `figma_hint` is present and Figma MCP tools are available:

Use the **design-brief-generator** subagent to provide a design guide for the feature, citing the `figma hint` and tell it to:

1. Extract only information that is useful for implementation, such as:  
   - Dimensions and layout (grid, spacing, alignment)  
   - Key typography tokens (font family, size, weight)  
   - Color tokens and semantic usage (primary, surface, border, error etc.)  
   - Border radius, shadows, and any notable visual detail
   - Icons, buttons, links or other UI elements
2. Summarise this as 3 to 8 concise bullet points and also leave a link to the figma component for future lookups. 
3. If lookup fails or the tools are not available, record a note like:  
   - `"Design reference could not be retrieved. See Figma manually for details."`

Always summarise into human friendly notes.

## Step 3. Switch to a new Git branch

Before making any content, switch to a new Git branch using the `branch_name` derived from the `$ARGUMENTS`. If the branch name is already taken, then append a version number to it: e.g. `claude/feature/card-component-01`

## Step 4. Draft the spec content

Create a markdown spec document that Plan mode can use directly and save it in the _specs folder using the `feature_slug`. Use the exact structure as defined in the spec template file here: @_specs/template.md. Do not add technical implementation details such as code examples.

## Step 4.5. Generate components (when applicable)

Determine whether the feature primarily involves creating one or more new UI components or a component set. Signals that it does:

- The feature title or description contains words like "component", "button", "card", "form", "input", "modal", "dialog", "badge", "tag", "chip", "widget", "panel", "layout", "nav", "menu", "dropdown", "toggle", "checkbox", "radio", "select", "table", "list", "icon", "avatar", "banner", "toast", "tooltip", "drawer", "sidebar"
- The Figma hint (if present) points to a component or component set
- The feature is clearly UI-only with no data-fetching, routing, or backend logic implied

If the feature is component-focused, invoke the **component-generator** subagent and pass it:
1. The `feature_title` as the component name
2. Any design brief bullet points produced in Step 2.5 (if available)
3. The Figma link (`figma_hint`) if present

The component-generator will scaffold the initial component file(s) and return a Design System Implementation Summary. Append this summary to the spec file under a new `## Component Scaffold` section at the bottom.

If the feature is NOT component-focused (e.g. a page, a data pipeline, an API route, or a database migration), skip this step entirely.

## Step 5. Final output to the user

After the file is saved, respond to the user with a short summary in this exact format:

Branch: <branch_name>
Spec file: specs/<feature_slug>.md
Title: <feature_title>

Do not repeat the full spec in the chat output unless the user explicitly asks to see it. The main goal is to save the spec file and report where it lives and what branch name to use.