/* global graphql */

import React from 'react';
import PropTypes from 'prop-types';

export default function Resume() {
  return (
    <div>
      <section className="container">
        <div className="medium-8 mediumOffset-2 large-10 largeOffset-1">
          <ul className="inline">
            <li>Site</li>
            <li>Email</li>
            <li>Skype</li>
          </ul>
          <hr />
          <h1>Kostas Bariotis</h1>
          <div className="">Software Engineer</div>
          <hr />
          <section>
            <h2>Brief</h2>
            <div className="content">
              <p>
                I am Kostas Bariotis, a software engineer from Thessaloniki, Greece. I am passionate
                about clean code and an advocate of that success is in the detail. I am interested
                in designing software architectures, APIs and databases to serve the rest of an
                application. My career path started with building e-commerce projects using various
                known platforms like Magento and Wordpress. After I gained the knowledge of how
                complete software systems work, I started working with startups companies where we
                were building our own product. I have worked with various languages (but mostly
                Javascript), databases (RDBMSes and NoSQL) and built monolithic applications as well
                as distributed systems.
              </p>
            </div>
          </section>
          <section>
            <h2>Experience</h2>
            <div className="content">
              <div className="item">
                <h3 className="title">
                  Senior Software Developer,​ ​Quotelier​, 2017(February)-2018(February)
                </h3>
                <div className="content">
                  As the lead developer in a team of three, I helped set up the infrastructure for
                  the Quotelier platform and apply best practices to both the backend and the
                  frontend blocks. I also learned a lot more about AWS infrastructure since it was
                  our IaaS of preference. I have worked with both the backend project, built
                  completely on AWS Lambdas with Node.js. I ‘ve also worked on the frontend project,
                  built with React.js and helped set up the testing strategy and raised the code
                  coverage of the codebase.
                </div>
              </div>
              <div className="item">
                <h3 className="title">
                  Nodejs Developer, Backend Product Engineer,​ ​Goodvidio​,
                  2015(March)-2016(December)
                </h3>
                <div className="content">
                  I have developed the backbone REST API that serves the Goodvidio service using
                  Javascript. Besides that, being the fourth developer in the team, I have
                  participated in the architecture build process that was designed to serve an
                  application that would scale fast. TDD was a requirement for this job and I have
                  enjoyed writing tests and keeping a high test coverage score.
                </div>
              </div>
              <div className="item">
                <h3 className="title">
                  Angular.js Developer, Front-End Developer,​ ​InsightReplay​, 2015(Jan)-2015(March)
                </h3>
                <div className="content">
                  I helped the InsightReplay team with the front end development of their product
                  while working closely with Angular.js 1.x.
                </div>
              </div>
              <div className="item">
                <h3 className="title">
                  Magento Developer, Front-End Developer,​ ​Walkinthepark.gr​, 2014(Feb)-2015(March)
                </h3>
                <div className="content">
                  Working mainly with E-Commerce businesses, I had the opportunity to work on the
                  world’s most valuable E-Commerce platform, Magento. I have written a lot of
                  modules and created many custom design themes.
                </div>
              </div>
              <div className="item">
                <h3 className="title">
                  Full Stack Web Developer, ​dTek Net.working​, 2013(Apr)-2014(Feb)
                </h3>
                <div className="content">
                  I have created several web applications, using PHP to serve dynamic content on the
                  client, mySQL to handle persistent data and Javascript to deliver a rich user
                  experiences. I have played with most popular Web{"'"}s APIs whilst i had the
                  opportunity to write one from scratch.
                </div>
              </div>
            </div>
          </section>
          <section>
            <h2>Projects</h2>
            <div className="content">
              <div className="item">Janitr.net​: ​The Slack bot that welcomes new users</div>
              <div className="item">
                DEVit{':'} The largest web development conference in Northern Greece. I am a
                co-organizer and the lead web developer for the last three years.
              </div>
              <div className="item">
                Devastation Podcast {':'} The first podcast for developers in Greek
              </div>
              <div className="item">
                Viral Facebook App {':'} A platform to create and manage Facebook Contests. More
                info here.
              </div>
              <div className="item">
                Carfinder.gr{':'} A used vehicles offers site. I developed a RESTful API that would
                serve both the frontend and the mobile application. It uses FatFreeFramework for the
                backend. On the frontend we developed some Single Page Applications pages, such as
                the search page. Built on top of BootstrapCSS framework and jQuery.
              </div>
            </div>
          </section>
          <section>
            <h2>Open Source</h2>
            <div className="content">
              <p>
                Some of my open-source projects are ​Throw.js​, ​Feedly API Wrapper​, ​Can-I​,
                Magento Product Feeds​. ​Besides those I am always contributing to big or small
                projects and getting involved on local communities, such as the ​Node.js SKG​ and
                SKGTech.io​ and trying to build the first ​Hackerspace in Thessaloniki​.
              </p>
              <p>
                I am enjoying public speaking about technologies I like and techniques I have used
                over the years. You can find my publicly available talks over at ​Slides​. I am also
                constantly ​writing on my blog​ about my experiences with those technologies.
              </p>
              <p>
                At 2014 I have participated in ​Thessaloniki Startup Live​ with the ​TuneDeck Team​
                and awarded with the first prize. Later that year i was in Thessaloniki’s Hackathon,
                the Hackathess​ with the ​SKGTech​ team and the ​ WeAreRoots​ project.
              </p>
            </div>
          </section>
          <section>
            <h2>Recommendations</h2>
            <div className="content">
              <i>( Upon request )</i>
            </div>
          </section>
          <section>
            <h2>PERSONAL​ ​SKILLS</h2>
            <div className="content">
              <ul>
                <li>Immediate familiarity on new technologies.</li>
                <li>Ability to work in a team effectively.</li>
                <li>Innovative, Analytical thinking.</li>
                <li>Mood for acquisition and transmission of knowledge.</li>
                <li>Organizational behavior, combined knowledge, methodically and consistently.</li>
                <li>Decision-making.</li>
                <li>Always in a mood to work and learn.</li>
              </ul>
            </div>
          </section>
          <section>
            <h2>Education</h2>
            <div className="content">
              <h3>Alexander Technological Educational Institute of Thessaloniki (ATEITH)</h3>
              <p>Bachelor of Science (BS), Computer Software Engineering, 2006 – 2011</p>
            </div>
          </section>
          <section>
            <h2>Interests</h2>
            <div className="content">
              <p>
                latest gadgets & technologies, snowboarding, reading history, philosophy and IT
                books, exercising, outdoor activities
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

Resume.propTypes = {
  data: PropTypes.object,
};

export const aboutPageQuery = graphql`
  query ResumePageSiteMetadata {
    site {
      siteMetadata {
        siteUrl
      }
    }
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        sizes {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
  }
`;
