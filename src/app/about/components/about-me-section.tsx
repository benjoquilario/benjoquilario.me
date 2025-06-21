import { TypographyH3, TypographyP } from "@/components/typography"
import CodeSpan from "./code-span"
import {
  PERSONAL_INFO,
  LEARNING_FOCUS,
  HOBBIES,
  MEETUP_ACTIVITIES,
} from "./constants"
import { Fragment } from "react"

const AboutMeSection: React.FC = () => {
  return (
    <div>
      <TypographyH3 className="mb-6 text-3xl">
        <span className="text-4xl">A</span>bout me.
      </TypographyH3>

      <div className="space-y-5 text-sm leading-7 md:text-[15px]">
        <TypographyP>
          I'm a passionate front-end web developer based in{" "}
          {PERSONAL_INFO.location}.
        </TypographyP>

        <TypographyP className="text-foreground/90">
          I've been coding and developing front-end applications for over{" "}
          {PERSONAL_INFO.experience} and have completed several freelance
          projects. Currently, I'm a {PERSONAL_INFO.yearLevel} at{" "}
          {PERSONAL_INFO.university}, where I continue to deepen my
          understanding of technology and software development.
        </TypographyP>

        <TypographyP className="text-foreground/90">
          My passion lies in front-end development and creating exceptional user
          experiences. Recently, I've expanded my skills to include backend API
          development and UX/UI design principles, working toward becoming a
          well-rounded full-stack developer.
        </TypographyP>

        <TypographyP className="text-foreground/90">
          I'm currently focused on learning{" "}
          {LEARNING_FOCUS.map((item, index) => (
            <Fragment key={item}>
              <CodeSpan>{item}</CodeSpan>
              {index < LEARNING_FOCUS.length - 1 &&
                (index === LEARNING_FOCUS.length - 2 ? " and " : ", ")}
            </Fragment>
          ))}
          .
        </TypographyP>

        <TypographyP className="text-foreground/90">
          Since technology evolves rapidly, I'm committed to continuous learning
          and staying current with the latest developments and best practices in
          the field.
        </TypographyP>

        <TypographyP className="text-foreground/90">
          When I'm not coding, I enjoy a variety of hobbies:
        </TypographyP>

        <ul className="my-6 ml-6 list-disc space-y-2">
          {HOBBIES.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>

        <TypographyP className="text-foreground/90">
          If you're in the {PERSONAL_INFO.meetupLocation} area, I'd love to
          connect! We could:
        </TypographyP>

        <ul className="my-6 ml-6 list-disc space-y-2">
          {MEETUP_ACTIVITIES.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>

        <TypographyP>
          I thrive both in independent work environments and collaborative team
          settings, and I'm always eager to take on new challenges and learn
          from different perspectives.
        </TypographyP>

        <TypographyP>
          I believe in the power of connection and knowledge sharing within the
          developer community. Let's build something amazing together!
        </TypographyP>
      </div>
    </div>
  )
}

export default AboutMeSection
