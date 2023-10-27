This is my proposal to a CV / Portfolio website.

## Project analysis
This project has been carefully designed to look modern and simple at the same time, with just an HTML and CSS toolset.

 - **The final user**: The final user would be anyone interested in knowing my learning and professional career: either an employer who is adquiring information or a geek that has landed on my github page.
 
 - **Information architecture**: The basic idea of the project is that it is a two-column based distribution consisting of only one webpage. The former consists of compact and visually appealing information, so that the reader can grasp the skillset and contact information quickly. The latter exposes more details and recognitions that the person has achieved that a quick passer-by might not find relevant. It is aimed at employers who would want to check the person's background or would explore his or her best projects.
 
 - **Visual design**: The main color of the project is blue. It is said to be associated with [inspiration, wisdom and serenity](https://en.wikipedia.org/wiki/Color_symbolism). Furthermore, the gradient on the background allows the user to feel like he or she is diving into the information as it scrolls down. Moreover, the logos of my career are all formed with different palettes of blue, which perfectly fit with the chosen aesthetic. The font choice is [Roboto](https://fonts.google.com/specimen/Roboto) as it is very clear to read and modern.
 
 ## Inspiration
 I gathered inspiration and resources from the following websites:
  - https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_cv&stacked=h
  - https://superdevresources.com/html-resume-templates/
 
 The first option was my main source of inspiration. Unfortunately it was programmed without different screen sizes in mind, so the use of Flexboxes was not possible. That is the main implementation that I wanted to add to an already clean CV. Nonetheless, the differences between the first example and my proposal are the following:
  - I added the projects part.
  - I made sure that both columns' length is the same, despite one being larger that the other.
  - I redid the implementation with flexboxes from the ground up.
  - I added many icons from the Font-Awesome API / Website.
  - I added links to external web-pages and resources such as e-mail and social-media sites.
  
  
## Figma design
First and foremost the whole website was designed with [Figma](https://www.figma.com/) and with icons from [Font Awesome](https://fontawesome.com/). 

Here is the link to the Figma project: https://www.figma.com/file/ng4OCPKeJZvLnmtbAXZvHR/CV-(el-bo)-(Copy)?type=design&mode=design&t=MwTrang2MUXayAa9-1

 > Font Awesome has been used in order to access a free-to-use library of icons.

## Project implementation
The project has been implemented following Figma's CSS tips and the use of Flexboxes. The latter allowed the website to be highly adaptative to many resolutions and screen sizes as the objects are allowed to float freely and rearrenge themselves in optimal positions according to the width of the screen. Height doesn't affect the viewer as he or she can scroll down until the end of the page is reached.

All the CSS and HTML files have been crafted by-hand, with the help of Figma's CSS help. A lot of `<div>` have been used to classify different parts of the design in order to generate a *template* for future expansion.