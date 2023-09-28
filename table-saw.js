class Tablesaw extends HTMLElement {
	constructor() {
		super();

		this.autoOffset = 50;

		this.attrs = {
			breakpoint: "media",
			ratio: "ratio",
		};

		this.defaults = {
			breakpoint: '(max-width: 39.9375em)', // same as Filament Group’s Tablesaw
			ratio: '1fr 2fr',
		};

		this.classes = {
			active: "active",
		};

		this.props = {
			ratio: "--table-saw-ratio",
		};

		this.css = `table-saw.active thead :is(th, td) {
	position: absolute;
	height: 1px;
	width: 1px;
	overflow: hidden;
	clip: rect(1px, 1px, 1px, 1px);
}
table-saw.active :is(tbody, tfoot) tr {
	display: block;
	margin-bottom: 1em;
}
table-saw.active :is(tbody, tfoot) :is(th, td) {
	display: grid;
	gap: 0 1em;
	grid-template-columns: var(--table-saw-ratio, ${this.defaults.ratio});
}
table-saw[zero-padding].active :is(tbody, tfoot) :is(th, td) {
	padding-left: 0;
	padding-right: 0;
}

table-saw .table-saw-label {
	display: none;
}
table-saw.active .table-saw-label {
	display: revert !important;
}`;
	}

	connectedCallback() {
		// Cut the mustard
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		if(!("replaceSync" in CSSStyleSheet.prototype)) {
			return;
		}

		this.init();

		// we *could* pass { media: this.getAttribute(this.attrs.breakpoint) } in
		// but then the breakpoints would be global and we want per-table breakpoints
		let sheet = new CSSStyleSheet();
		sheet.replaceSync(this.css);

		// Only add stylesheet once
		if(document.adoptedStyleSheets?.[0]?.cssRules?.[0]?.cssText !== sheet.cssRules[0].cssText) {
			document.adoptedStyleSheets.push(sheet);
		}
	}

	init() {
		let added = this.addHeaders();

		if(added === false) {
			console.error("Could not find any `<th>` elements for Tablesaw web component.", this);
			return;
		}

		this.setRatio();

		let breakpoint = this.getAttribute(this.attrs.breakpoint) || this.defaults.breakpoint;

		Tablesaw.onmedia(breakpoint, (matches) => {
			this.classList[matches ? "add" : "remove"](this.classes.active);
		});
	}

	static onmedia(query, callback) {
		let mm = {
			matches: true
		};

		if(query && ("matchMedia" in window)) {
			mm = window.matchMedia(query);
		}

		if(mm.matches) {
			callback(true);
		}

		mm.addListener(e => {
			callback(e.matches);
		});
	}

	addHeaders() {
		let labels = Array.from(this.querySelectorAll("thead th")).map(entry => entry.innerText);
		if(labels.length === 0) {
			return false;
		}

		let nodes = [];
		for(let label of labels) {
			let l = document.createElement("b");
			l.classList.add("table-saw-label");
			l.setAttribute("aria-hidden", true);
			l.style.display = "none"; // defensive in case the stylesheet insertion fails
			l.innerText = label;

			nodes.push(l);
		}

		let cells = this.querySelectorAll("tbody td");
		for(let cell of cells) {
			cell.prepend(nodes[cell.cellIndex].cloneNode(true));
		}
	}

	setRatio() {
		let ratio = this.getAttribute(this.attrs.ratio);
		if(ratio) {
			let ratioString = ratio.split("/").join("fr ") + "fr";
			this.style.setProperty(this.props.ratio, ratioString);
		}
	}
}

if("customElements" in window) {
	window.customElements.define("table-saw", Tablesaw);
}

export { Tablesaw };