const currency1 = $('.currency1');
const amount1 = $('#amount1');
const currency2 = $('.currency2');
const amount2 = $('#amount2');
const swap = $('#swap');

//fetch rates and update page
function calculate() {
	const currency1Val = currency1[0].value;
	const currency2Val = currency2[0].value;

	fetch(`https://prime.exchangerate-api.com/v5/52e31612a9d913ace087a2dc/latest/${currency1Val}`)
		.then((res) => res.json())
		.then((data) => {
			//console.log(data);
			const rate = +data.conversion_rates[currency2Val];
			$('.rate')[0].innerText = `1 ${currency1Val} = ${rate} ${currency2Val}`;
			amount2[0].value = (rate * +amount1[0].value).toFixed(2);
		});
}

currency1.change(calculate);
currency2.change(calculate);
amount1[0].addEventListener('input', calculate);
amount2[0].addEventListener('input', calculate);

swap.click(function() {
	let t;
	t = currency1[0].value;
	currency1[0].value = currency2[0].value;
	currency2[0].value = t;

	calculate();
});
calculate();
