let equalTests = new Map(
	[
		// entered - expected
		["", ""],
		["1", "1"], 
		[" 1", "1"],
		["1 ", "1"],
		[" 1 ", "1"],
		["00", "0"],
		[" 0 1 ", "01"],
		["ab", "a"],
		[" a b c", "ab"],
		["~", "~"],
		["😁", "😁"],
		["👌","👌"],
		["👿", "👿"],
		//["👿 😁", "👿 😁"] //will fail and list all the passed tests as failed
	]
);

let failTests = new Map(
	[
		// entered - expected
		["", "1"],
		["😁", "1"]
		//["😁 😁", "😁 😁"] //malformed URI sequence
		//["😁 👌","👌"] //malformed URI sequence
	]
);

//map.get("key1"); // => value1
for (var v of equalTests) {
	var given = v[0];
	let expected = v[1].toUpperCase();

	var info = "Equal '" +given + "' - '" + expected + "'";

$('.profile').initial({ name: given });
	let char = $('.profile').attr('testoutput');
	
	QUnit.test(info, function (assert) {
		assert.equal(char, expected, "String '" + char + "' and '" + expected + "' have the same value");
	});
}

for (var v of failTests) {
	var givenToFail = v[0];
	let expectedToFail = v[1].toUpperCase();

	var infoF = "NotEqual '" + givenToFail + "' - '" + expectedToFail + "'";

	$('.profile').initial({ name: givenToFail });
	let charF = $('.profile').attr('testoutput');
	
	charF = charF.toString();

	QUnit.test(infoF, function (assert) {
		assert.notEqual(charF, expectedToFail, "String '" + charF + "' and '" + expectedToFail + "' don't have the same value");
	});
}
