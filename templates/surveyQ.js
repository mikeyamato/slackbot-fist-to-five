module.exports = {
	"text": "What time is it? It's Fist-to-Five survey time! Yay! :tada:",
	"attachments": [
		{
			"title": "How well do you understand this material?\n\nResponses are 100% anonymous.\n",
			"callback_id": "fist_results",
			"attachment_type": "default",
			"color": "#FF9DBB",
			"actions": [
				{
					"name": "fist_select",
					"text": "Select one...",
					"type": "select",
					"options": [
						{
							"text": "Fist  (Help, I'm lost)",
              "value": "fist"
						},
						{
							"text": "1 finger  (I barely understand)",
              "value": "one_finger"
						},
						{
							"text": "2 fingers  (I'm starting to understand)",
              "value": "two_finger"
						},
						{
							"text": "3 fingers  (I somewhat get it)",
              "value": "three_finger"
						},
						{
							"text": "4 fingers  (I'm comfortable with the idea)",
              "value": "four_finger"
						},
						{
							"text": "5 fingers  (I understand this 100%)",
              "value": "five_finger"
						},
					],
					"confirm": {
						"title": "Are you sure?",
						"text": "Just wanted to confirm your selection. :nerd_face:",
						"ok_text": "Yes, I'm sure",
						"dismiss_text": "No, I'm not sure"
					}
				}
			]
		}
	],
	"response_type": "in_channel"
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