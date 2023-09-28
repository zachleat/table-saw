# `table-saw`

A small structural-only zero-dependency Web Component for responsive `<table>` elements. Heavily inspired by [Filament Group’s Tablesaw Stack jQuery plugin](https://github.com/filamentgroup/tablesaw).

## [Demo](https://zachleat.github.io/table-saw/demo.html)

## Examples

```html
<!-- Note: requires `type="module"` -->
<script type="module" src="table-saw.js"></script>

<!-- stacks below 640px viewport -->
<table-saw>
	<table><!-- some HTML omitted for brevity --></table>
</table-saw>

<!-- stacks below 400px viewport -->
<table-saw media="(max-width: 24.9375em)">
	<table><!-- … --></table>
</table-saw>

<!-- stack columns are 50% and 50% width -->
<table-saw ratio="1/1">
	<table><!-- … --></table>
</table-saw>
```

* Use `media` attribute to set the breakpoint (default `(max-width: 39.9375em)`, e.g. `<table-saw media="(max-width: 24.9375em)">`).
* Use `ratio` attribute to override the small viewport column ratio (default `1/2`, e.g. `<table-saw ratio="1/1">`).

## Installation

Install via [npm on `@zachleat/table-saw`](https://www.npmjs.com/package/@zachleat/table-saw).

```sh
npm install @zachleat/table-saw
```

## Features

* Supports one or many `<table>` child elements.
* Uses CSS grid for small viewport alignment.
* Falls back to regular table before or without JavaScript.
* Cuts the mustard on [`CSSStyleSheet.prototype.replaceSync`](https://caniuse.com/mdn-api_cssstylesheet_replacesync)