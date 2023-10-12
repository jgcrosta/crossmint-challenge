import { type MegaverseMap } from "~/server/api/utils/megaverse/megaverse";

export const Megaverse = ({
  title,
  map,
}: {
  title: string;
  map: MegaverseMap;
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 font-bold">{title}</h2>
      {map.map((item, id) => (
        <div key={id} className="leading-[1.2em] tracking-[.1em]">
          {item.map((item, id) => (
            <span key={id}>{item.icon}</span>
          ))}
        </div>
      ))}
    </div>
  );
};
