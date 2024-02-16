# ZSB widget version 2

This project is built with Vite and React.

## Prerequisites

Before you start, ensure you have Node.js 16 installed on your machine. We recommend using NVM (Node Version Manager) for managing Node.js versions.

## Usage
```js
import 'zsb-widget-v2'

const App = () => {
  return (
    <>
      <zeroshot-bot bot="{bot-id-here}" color="#167BE7"> </zeroshot-bot>
    </>
  )
}

```

## Properties / Bot Configuration (props/variable name => Description/Functionality.)
(Data type: String)


- bot => Bot credentials.
- color => Backround color of the widget. (in hex code - include #)
- textColor => Font/text color. (in hex code - include #)
- height => Height of the widget. (in pixels - add px)
- showCloseButton => Show or hide the close button on Mobile view/Small screen view. (OPT: true/false)
- openWidget => Auto open the widget upon loading. (OPT: true/false)
- headerResponseImgUrl => Image URL for the header logo.
- widgetIconUrl => Image URL for the widget logo.
- fontSize => Font size of conversation.(in pixels - add px)
- fontStyle => Font Style of the conversation.
- bubbleColor => Background color of the client message. (hex code - include #)
- bubbleGradient => Background color of the bot message. (Gradient Color of the Bubble Color - RGBa)

For Config File only

- placeholder => Placeholder of the chat area.
- subtitle => Subtitle of the widget.
- background => Background of the Demo App. (OPT: dark/light)
- position => Position of the widget. (OPT: bottom-left, bottom-right, mid-left, mid-right, top-left, top-right)
- shape => Shape of the widget. (OPT: circle, rectangle)
- avatarPosition => Where the avatar will be reflected. (OPT: header/chat)
- avatar => Avatar of the widget (OPT: icon1, icon2, icon3, icon4)
- src => Label if shape is rectangle.
- iconColor => Color of the icon. (in hex code - include #)
- maxUnlike => Maximum number of unliking the response/answer.
- welcomeMessage => Message when opening the widget.
- cancelledFormMessage => Message when cancelling the form for Agent handover.
- submittedFormMessage => Message when submitting the form for Agent handover.
- formFields => (Array: [{label: "", attribute: "", mandatory: false}]) fields for Agent handover form.
- formHeader => Header of the form.
- componentTitle => Title of the bot.
- category => Widget UI (OPT: text or image)
- headerLogoPosition => Icon Position in the header (OPT: left, right, center)
zsb-widget- interactionHistory => Save the interaction history
- maxInteraction => Maximum number of interaction to be stored


### License
This project is licensed under the MIT License - see the LICENSE file for details.