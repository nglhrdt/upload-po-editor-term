# upload-po-editor-term README

Select a string in the editor and use it to create a PO Editor term according to the selected string.

## Features

The extension will create a PO Editor term according to the selected string in the editor. It will only allow strings that start with one of the phrases

- generic
- components
- pages

The provided string will be split by . and the last part will be used as the term name. The leading part will be used as the term context.

### Examples

- `generic.save` will result in the term `save` with the context `generic`.
- `components.saveButton.text` will result in the term `text` with the context `components.saveButton`.

## Extension Settings

The following settings are available:

- `apiToken`: Api token for PO Editor with read and write access (required)
- `projectId`: The PO Editor project id to use (required)
