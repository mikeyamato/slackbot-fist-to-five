module.exports = {
	"text": "Fist to Five Survey Time!",
	"attachments": [
		{
			"title": "Click button to find another victim.",
			"fallback": "Click button to find another victim.",
			"callback_id": "hunt_victim_mw",
			"attachment_type": "default",
			"color": "#FF9DBB",
			"actions": [
				{
					"name": "anotherVictim",
					"text": "Hunt :fist-zero:",
					"type": "button",
					"style": "default"
				}
			]
		}
	]
}