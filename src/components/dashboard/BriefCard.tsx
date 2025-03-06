import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  interface CardWithFormProps {
    title: string;
    content: string | number;
  }
  
  export default function CardWithForm({ title, content }: CardWithFormProps) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-bold">{content}</h3>
        </CardContent>
      </Card>
    );
  }
  