# ZSB widget version 2

This project is built with Vite and React.

## Prerequisites

Before you start, ensure you have Node.js 18 installed on your machine. We recommend using NVM (Node Version Manager) for managing Node.js versions.

You can use v1 version if your app is still in node 16.


## Usage
### For Node 18+

```bash
npm install zsb-widget-v2
```
or
```bash
yarn add zsb-widget-v2
```

### For Node 16

```bash
npm install zsb-widget-v2@v1.x
```
or
```bash
yarn add zsb-widget-v2@v1.x
```

Import to your component

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
- color => Background or theme color of the widget. (in hex code - include #)
- textColor => Font/text color. (in hex code - include #)
- height => Height of the widget excluding the launcher and chat header. (in pixels - add px)
- showCloseButton => Show or hide the close button on Mobile view/Small screen view. (OPT: true/false)
- autoOpen => Auto open the widget upon loading. Previously *openWidget* (deprecated). (OPT: true/false)
- avatar => Accepts 'icon1', 'icon2', 'icon3', 'icon4', image URL, or node for the **header** and **reply** avatar. Previously *headerResponseImgUrl* (deprecated).
- avatarPosition => Where the **avatar** will be reflected. (OPT: header/chat)
- launcherLogo => Image URL for the widget logo. Previously *widgetIconUrl* (deprecated).
- fontSize => Font size of conversation.(in pixels - add px)
- fontStyle => Font Style of the conversation.
- clientBubbleColor => Background color of the client message. Previously *bubbleColor* (deprecated)  (hex code - include #)
- replyBubbleGradient => **Alpha** of the *clientBubbleColor*. Adapts the background color of bubbleColor. Previously *bubbleGradient* (deprecated).

  - Example:

    (replyBubbleGradient: '0.15')

    (output: rgba('clientBubbleColor', '0.15'))

- disableClose => Prevent closing/minimizing the chat widget
- hideWidgetMenu => Hide extra menu on chat header

For Config File props

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
- interactionHistory => Save the interaction history
- maxInteraction => Maximum number of interaction to be stored


### License
This project is licensed under the MIT License - see the LICENSE file for details.