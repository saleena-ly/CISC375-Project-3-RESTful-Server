Vue.component('map', {
	template: `
		<form class="locationInput" @submit.prevent="onSubmit">
			<p class="error" v-if="!error">
				<b>Please enter a location that is inside of St. Paul</b>
			</p>

			<p>
				<label for="location">Location coordinates or address:</label>
				<input class="location" v-model="location">
			</p>

			<p>
				<input type="submit" value="Update">
			</p>
		</form>
	`,
	data()
	{
		return
		{
			location: null,
			error: null
		}
	},
	methods: 
	{
		onSubmit()
		{
			if(location) //contraint location with coordinates of St.Paul
			{
				this.error = false;
			}
		}
	},
	computed:
	{

	}
});

Vue.component('table', {
	template: `
		<div class="scroll_table">
			<h1>Crimes in St. Paul</h1>
			<table>
				<thead>
					<tr>
						<th scope="col">Neighborhood</th>
						<th scope="col">Case Number</th>
						<th scope="col">Date</th>
						<th scope="col">Time</th>
						<th scope="col">Code</th>
						<th scope="col">Incident</th>
						<th scope="col">Police Grid</th>
						<th scope="col">Neighborhood Number</th>
					</tr>
				</thead>
				<tbody>
					<tr>
                        <td scope="row"></td>
                        <td></td>
					</tr>
				</tbody>
			</table>
	`,
	data()
	{
		return
		{

		}
	},
	methods: 
	{
		
	},
	computed:
	{

	}
});

var app = new Vue({
	el: '#app',
	data: {

	},
	methods: {

	}
});