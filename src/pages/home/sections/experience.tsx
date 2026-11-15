import { FaGraduationCap, FaBriefcase } from "react-icons/fa6";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { education } from "@/data/education";
import { workExperience } from "@/data/workExperience";

// Shows `logoDark` instead of `logo` in dark mode, when an entry provides one.
// Logos sit in a fixed tile so wide wordmarks and square emblems line up.
function Logo({ src, srcDark, alt }: { src: string; srcDark?: string; alt: string }) {
  const img = "h-full w-full object-contain";
  return (
    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border bg-muted/40 p-2">
      {srcDark ? (
        <>
          <img src={src} alt={alt} className={`${img} dark:hidden`} loading="lazy" />
          <img src={srcDark} alt={alt} className={`${img} hidden dark:block`} loading="lazy" />
        </>
      ) : (
        <img src={src} alt={alt} className={img} loading="lazy" />
      )}
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="rounded-md md:px-2">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center items-center gap-2 text-plus">
            <FaGraduationCap />
            Education
          </CardTitle>
        </CardHeader>
        <ScrollArea className="max-h-96">
          <CardContent className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex items-center gap-4">
                <Logo
                  src={edu.logo}
                  srcDark={"logoDark" in edu ? edu.logoDark : undefined}
                  alt={`${edu.school} logo`}
                />
                <div>
                  <div className="font-semibold">{edu.school}</div>
                  <div className="text-sm text-muted-foreground">
                    {edu.years}
                  </div>
                  <div className="text-sm">{edu.degree}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="rounded-md md:px-2">
        <CardHeader>
          <CardTitle className="flex flex-row justify-center items-center gap-2 text-plus">
            <FaBriefcase />
            Work Experiences
          </CardTitle>
        </CardHeader>
        <ScrollArea className="max-h-96">
          <CardContent className="space-y-4">
            {workExperience.map((job, index) => (
              <div key={index} className="flex items-center gap-4">
                <Logo
                  src={job.logo}
                  srcDark={"logoDark" in job ? job.logoDark : undefined}
                  alt={`${job.company} logo`}
                />
                <div>
                  <div className="font-semibold">{job.company}</div>
                  <div className="text-sm text-muted-foreground">
                    {job.years}
                  </div>
                  <div className="text-sm">{job.title}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
