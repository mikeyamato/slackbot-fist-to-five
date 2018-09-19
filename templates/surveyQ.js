module.exports = {
	"text": "Fist to Five Survey Time!",
	"attachments": [
		{
			"title": "How well are you understanding the material? \nFist = \"Ahh! I'm lost.\" \nFive = \"I understand it 100%.\"",
			"fallback": "How well are you understanding the material? \nFist = \"Ahh! I'm lost.\" \nFive = \"I understand it 100%.\"",
			"callback_id": "fist_results",
			"attachment_type": "default",
			"color": "#FF9DBB",
			"actions": [
				{
					"name": "fist_select",
					"text": "Choose one...",
					"type": "select",
					"options": [
						{
							"text": "Fist :fist_zero:",
              "value": "fist"
						},
						{
							"text": "1 finger",
              "value": "one_finger"
						},
						{
							"text": "2 fingers",
              "value": "two_finger"
						},
						{
							"text": "3 fingers",
              "value": "three_finger"
						},
						{
							"text": "4 fingers",
              "value": "four_finger"
						},
						{
							"text": "5 fingers",
              "value": "five_finger"
						},
					],
					"confirm": {
						"title": "Are you sure?",
						"text": "Just making sure.",
						"ok_text": "Select",
						"dismiss_text": "Cancel"
					}
				}
			]
		}
	]
}

/*
{
					"name": "fist_one",
					"text": ":fist-one:",
					"type": "button",
					"style": "default"
				},
				{
					"name": "fist_two",
					"text": ":fist-two:",
					"type": "button",
					"style": "default"
				},
				{
					"name": "fist_three",
					"text": ":fist-three:",
					"type": "button",
					"style": "default"
				},
				{
					"name": "fist_four",
					"text": ":fist-four:",
					"type": "button",
					"style": "default"
				},
				{
					"name": "fist_five",
					"text": ":fist-five:",
					"type": "button",
					"style": "default"
				}
*/