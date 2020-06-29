/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

let config = {

	address: '10.0.2.15',
	port: 80,
	ipWhitelist: ['10.0.2.2'],
	serverOnly: true,
	//language: 'de',

	modules: [
		{
			module: 'clock',
			position: 'top_right'
		},
		{
			module: 'MMM-OnThisDay',
			position: 'top_left',
		}
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
