# `table-saw`

A small structural-only Web Component for responsive `<table>` elements. Heavily inspired by [Filament Group’s Tablesaw Stack jQuery plugin](https://github.com/filamentgroup/tablesaw).

## Example

```html
<!-- Note: requires `type="module"` -->
<script type="module" src="table-saw.js"></script>

<table-saw>
	<table>
		<!-- some HTML omitted for brevity -->
	</table>
</table-saw>
```

Supports one or many `<table>` child elements.

## Installation

```sh
npm install @zachleat/table-saw
```

## API

* Use `media` attribute to set the breakpoint (default `(max-width: 39.9375em)`, e.g. `<table-saw media="(max-width: 24.9375em)">`).
* Use `ratio` attribute to override the small viewport column ratio (default `1/2`, e.g. `<table-saw ratio="1/1">`).

## Features

* Uses CSS grid for small viewport alignment.
* Falls back to regular table before or without JavaScript.
* Cuts the mustard on [`CSSStyleSheet.prototype.replaceSync`](https://caniuse.com/mdn-api_cssstylesheet_replacesync)