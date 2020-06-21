#CSS in Js, Template literals, and Styled Components

So I have been working on an app that is utilizing styled-components. Big fan 
of styled-components by the way. I feel like CSS in JS still very early in its 
life. Not as many tools out to take full advantage of writing CSS styles in our 
Javascript. Yet! 

So when I first started using styled-components it was awkward. I wasn't sure
if I was putting quotes in the right place. Did I need a simi coln at the
end of the statement or not. More often than not I would revert back to
using Scss and only making use of styled-components if I thought it would be
easier to use some javascript variable to change my CSS styles. Well, I am
here to tell you those days are in the past. A mighty, modern style linter
stylelint A mighty, modern linter that helps  you avoid errors and enforce
conventions in your styles.stylelint.io


https://github.com/stylelint/stylelint 

Stylint to the rescue. For those that
 haven't heard of or know what Sylint is. It's a CSS listing library built with typescript. They even have a plugin for Webstorm and Vscode. No more guessing or running your code to see if that CSS style you wrote in your styled component takes effect. I even get the little red squiggly lines telling me I've written incorrect syntax. 


}Now I can feel like I can take full advantage of CSS in Js. And it doesn't stop there. Or at least it didn't for me. I heard a while back about this template literal and how funky it was. I didn't listen. Wasn't really sure what was going on with the styled-components and the backticks. I just thought maybe the developers were trying to be cool. Turns out I most developers have a reason for doing something the way they are doing it. 


So while I was looking into the theme context with styled-components. I ran across several other libraries that are starting to come around. 
styled-theming and styled-map to be specific
Again, these template literals are being used. 
import styledMap from 'styled-map';

const buttonColor = styledMap`
  primary: #0c0;
  warning: #c00;
  info: #0cc;
  default: #ccc;
`;

const Button = styled.button`
  color: ${buttonColor};
  border: 2px solid ${buttonColor};
  font-size: ${styledMap`
    large: 32px;
    small: 8px;
    medium: 18px;
    default: 16px;
  `};
`;
Well styled map will map the keys to the props on your component.  So if you
 pass primary to the component as part of its props. it'll take the  value
  associated with primary above and return its value to the function  below
that has it wrapped up. If you pass it the value of warning then it  will
 map that value instead. Turns out it's a lot cleaner looking than the
way of doing things. But wait a min. How does that above even work
You just create a function where ever you want and magically it has
the props value from the react component. 

Well, as it turns out, template literals are actually evoking function calls
.  And everything written inside of the backticks is passed to that function
  as arguments. Everywhere there is a function wrapped in ${}. That gets
parsed  out of the string arguments that is passed to the function and
everywhere there is a function wrapped in ${}. That is parsed out of
 string argument and placed into an array that is also passed to the
function that was called. So what does this mean? It means we, and
by we I really mean styled-components end up with an array of
arguments and everywhere there was a function, a break in the
string and the actual function gets parsed out and added to
the array. So they end up with a nice, not so nice keys
mapping to functions kind of thing. So I had to give  this
 a shot and see what all the hype was about. Here is  what
I came up. Disclaimer. I did not event this pattern. I was merely going along
  with styled-components, styled-map, and styled-theming. 
const THEME = {themeDark: "#0D2545", themeLight: "#A2D8C7"}
const onTheme = onThemeValue( "background" )`
dark: ${ THEME.themeDark };
light: ${ THEME.themeLight }
`;
const Container = styled( Button )`
&& {
${ onTheme };
}
`;