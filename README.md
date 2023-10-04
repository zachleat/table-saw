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
<table-saw breakpoint="(max-width: 24.9375em)">
	<table><!-- … --></table>
</table-saw>

<!-- stack columns are 50% and 50% width -->
<table-saw ratio="1/1">
	<table><!-- … --></table>
</table-saw>

<!-- Remove left/right padding on table cells when stacked -->
<table-saw zero-padding>
	<table><!-- … --></table>
</table-saw>

<!-- Force left-aligned text when stacked -->
<table-saw text-align>
	<table><!-- … --></table>
</table-saw>

<!-- Use your own text-align value when stacked -->
<table-saw text-align="right">
	<table><!-- … --></table>
</table-saw>
```

* Use `breakpoint` attribute to set the breakpoint (default:`(max-width: 39.9375em)`).
* Use `type="container"` attribute to use container queries instead of viewport-based media queries (default: `type="media"`).
* Use `ratio` attribute to override the small viewport column ratio (default: `1/2`).
* Use `zero-padding` attribute to remove small viewport padding on table cells.
* Use `force-align` attribute to force column text alignment at small viewport.

## Installation

You have a few options (choose one of these):

1. Install via [npm](https://www.npmjs.com/package/@zachleat/table-saw): `npm install @zachleat/table-saw`
1. [Download the source manually from GitHub](https://github.com/zachleat/table-saw/tags) into your project.
1. Skip this step and use the script directly via a 3rd party CDN (not recommended for production use)

### Usage

Make sure you include the `<script>` in your project (choose one of these):


```html
<!-- Host yourself -->
<script type="module" src="table-saw.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script type="module" src="https://www.unpkg.com/@zachleat/table-saw@1.0.2/table-saw.js"></script>
```

```html
<!-- 3rd party CDN, not recommended for production use -->
<script type="module" src="https://esm.sh/@zachleat/table-saw@1.0.2"></script>
```

## Features

* Supports one or many `<table>` child elements.
* Works with viewport media queries or container queries.
* Uses CSS grid for small viewport alignment.
* Falls back to regular table before or without JavaScript.
* Cuts the mustard on [`CSSStyleSheet.prototype.replaceSync`](https://caniuse.com/mdn-api_cssstylesheet_replacesync)
