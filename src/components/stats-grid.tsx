import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Stats {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export function StatsGrid({ stats }: { stats: Stats }) {
  const statCards = [
    { label: "Total", value: stats.total, color: "indigo" },
    { label: "Applied", value: stats.applied, color: "blue" },
    { label: "Interviews", value: stats.interview, color: "emerald" },
    { label: "Offers", value: stats.offer, color: "purple" },
    { label: "Rejections", value: stats.rejected, color: "red" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 mb-12 md:grid-cols-3 lg:grid-cols-5">
      {statCards.map(({ label, value, color }, i) => (
        <Card key={label} className="transition-all border-0 shadow-xl hover:shadow-2xl group">
          <CardContent className="p-8">
            <div className="text-3xl font-bold text-transparent transition-transform bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text group-hover:scale-110">
              {value}
            </div>
            <p className="mt-2 text-sm font-medium tracking-wide text-gray-600 uppercase">
              {label}
            </p>
            <Badge className={`mt-3 bg-${color}-100 text-${color}-800`}>
              {label.toLowerCase()}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}