import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface HeadingPageProps {
  heading: string;
  desc: string;
}
const HeadingPage = ({ heading, desc }: HeadingPageProps) => {
  return (
    <Card className="mx-auto w-[96%] gap-6">
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
        <CardDescription className="w-3/4 text-wrap">{desc}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default HeadingPage;
