export function addDays(date: Date, days: number): Date {
	var result: Date = new Date(date);
	result.setDate(date.getDate() + days);
	return result;
}

export function getPropertyValue(object: any, property: string): string {
	if (object && object != "&nbsp;" && object.get(property)) {
		return object.get(property);
	} else {
		return "";
	}
}

export function getPropertyValueHTML(object: any, property: string, prefix: string, suffix: string): string {
	let value: string = this.getPropertyValue(object, property);
	if (value != "") {
		if (prefix) {
			value = prefix + value;
		}
		if (suffix) {
			value = value + suffix;
		}

		return value;
	} else {
		return "&nbsp;"; // Use with #= in templates and data-bind html, not text, or will be rendered as &amp;nbsp;
	}
}

export function isDefined(obj): boolean {
	return obj !== null && obj !== undefined;
}
