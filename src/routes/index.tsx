import { createFileRoute } from "@tanstack/react-router";
import WeddingInvitation from "@/components/WeddingInvitation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H & R — دعوة زفاف" },
      {
        name: "description",
        content:
          "دعوة زفاف H & R — عقد القران ومأدبة العروس، وحفل الزفاف ومأدبة العريس. حضوركم يسعدنا ويشرّفنا.",
      },
      { property: "og:title", content: "H & R — دعوة زفاف" },
      {
        property: "og:description",
        content:
          "دعوة زفاف H & R — عقد القران ومأدبة العروس، وحفل الزفاف ومأدبة العريس.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingInvitation />;
}
