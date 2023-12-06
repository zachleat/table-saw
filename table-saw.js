class Tablesaw extends HTMLElement {
	static identifiers = {};

	constructor() {
		super();

		this.autoOffset = 50;
		this._needsStylesheet = true;

		this.attrs = {
			breakpoint: "breakpoint",
			breakpointBackwardsCompat: "media",
			type: "type",
			ratio: "ratio",
			label: "data-tablesaw-label",
			zeropad: "zero-padding",
			forceTextAlign: "text-align"
		};

		this.defaults = {
			breakpoint: '(max-width: 39.9375em)', // same as Filament Group’s Tablesaw
			ratio: '1fr 2fr',
		};

		this.classes = {
			wrap: "tablesaw-wrap"
		}

		this.props = {
			ratio: "--table-saw-ratio",
			bold: "--table-saw-header-bold",
		};
	}

	generateCss(breakpoint, type) {
		return `
table-saw.${this._identifier} {
	display: block;
	${type === "container" ? "container-type: inline-size;" : ""}
}

@${type} ${breakpoint} {
	table-saw.${this._identifier} thead :is(th, td) {
		position: absolute;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
	}
	table-saw.${this._identifier} :is(tbody, tfoot) tr {
		display: block;
	}
	table-saw.${this._identifier} :is(tbody, tfoot) :is(th, td):before {
		font-weight: var(${this.props.bold});
		content: attr(${this.attrs.label});
	}
	table-saw.${this._identifier} :is(tbody, tfoot) :is(th, td) {
		display: grid;
		gap: 0 1em;
		grid-template-columns: var(${this.props.ratio}, ${this.defaults.ratio});
	}
	table-saw.${this._identifier}[${this.attrs.forceTextAlign}] :is(tbody, tfoot) :is(th, td) {
		text-align: ${this.getAttribute(this.attrs.forceTextAlign) || "left"};
	}
	table-saw.${this._identifier}[${this.attrs.zeropad}] :is(tbody, tfoot) :is(th, td) {
		padding-left: 0;
		padding-right: 0;
	}
}`;
	}

	connectedCallback() {
		// Cut the mustard
		// https://caniuse.com/mdn-api_cssstylesheet_replacesync
		if(!("replaceSync" in CSSStyleSheet.prototype)) {
			return;
		}

		this.addHeaders();
		this.setRatio();

		if(!this._needsStylesheet) {
			return;
		}

		let sheet = new CSSStyleSheet();
		let breakpoint = this.getAttribute(this.attrs.breakpoint) || this.getAttribute(this.attrs.breakpointBackwardsCompat) || this.defaults.breakpoint;
		let type = this.getAttribute(this.attrs.type) || "media";

		this._identifier = `ts_${type.slice(0, 1)}${breakpoint.replace(/[^a-z0-9]/gi, "_")}`;
		this.classList.add(this._identifier);

		if(!Tablesaw.identifiers[this._identifier]) {
			let css = this.generateCss(breakpoint, type);
			sheet.replaceSync(css);

			document.adoptedStyleSheets.push(sheet);

			Tablesaw.identifiers[this._identifier] = true;
		}
	}

	addHeaders() {
		let headerCells = this.querySelectorAll("thead th");
		let labels = Array.from(headerCells).map((cell, index) => {
			// Set headers to be bold (if headers are bold)
			if(index === 0) {
				let styles = window.getComputedStyle(cell);
				if(styles) {
					// Copy other styles?
					let bold = styles.getPropertyValue("font-weight");
					this.setBold(bold);
				}
			}

			return cell.innerText.trim()
		});
		if(labels.length === 0) {
			this._needsStylesheet = false;
			console.error("No `<th>` elements for Tablesaw were found:", this);
			return;
		}

		let cells = this.querySelectorAll("tbody :is(td, th)");
		for(let cell of cells) {
			if(!labels[cell.cellIndex]) {
				continue;
			}

			cell.setAttribute(this.attrs.label, labels[cell.cellIndex]);

			let nodeCount = 0;
			for(let n of cell.childNodes) {
				// text or element node
				if(n.nodeType === 3 || n.nodeType === 1) {
					nodeCount++;
				}
			}

			// wrap if this cell has child nodes for correct grid alignment
			if(nodeCount > 1) {
				let wrapper = document.createElement("div");
				wrapper.classList.add(this.classes.wrap);
				while(cell.firstChild) {
					wrapper.appendChild(cell.firstChild);
				}
				cell.appendChild(wrapper);
			}
		}
	}

	setBold(bold) {
		if(bold || bold === "") {
			this.style.setProperty(this.props.bold, bold);
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