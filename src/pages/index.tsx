import { type InferGetServerSidePropsType, type NextPage } from "next";
import { type GetServerSideProps } from "next";
import Head from "next/head";

import { env } from "~/env.mjs";
import { getGoalMap } from "~/server/api/utils/megaverse/goal-map/get-goal-map";
import { getCurrentMap } from "~/server/api/utils/megaverse/current-map/get-current-map";
import { mapDiff } from "~/utils/map-diff";
import { useToast } from "~/components/ui/use-toast";
import { fetchCurrentMap } from "~/server/api/utils/megaverse/current-map/current-map-api";
import { fetchGoalMap } from "~/server/api/utils/megaverse/goal-map/goal-map-api";
import { LoadingButton } from "~/components/loading-button";
import { Megaverse } from "~/components/megaverse";
import { useState } from "react";
import { clearMegaverseMap, matchMegaverseMap } from "~/utils/map-match";
import { Progress } from "~/components/ui/progress";

type ToastVariant = "default" | "success" | "destructive";
type MegaverseState = "matching" | "clearing" | "idle";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ currentMap, goalMap }) => {
  const [megaverseState, setMegaverseState] = useState<MegaverseState>("idle");
  const [currentMegaverseMap, setCurrentMap] = useState(currentMap);
  const initialDiff = mapDiff({ currentMap, goalMap });
  const currentDiff = mapDiff({ currentMap: currentMegaverseMap, goalMap });

  const { toast } = useToast();

  const showToast = (message: string, variant: ToastVariant) => {
    const description = (
      <div className="flex items-center space-x-2">
        <span>{message}</span>
      </div>
    );
    toast({
      description,
      variant,
    });
  };

  const isMatchBtnDisabled =
    megaverseState !== "idle" || currentDiff.length === 0;
  const isClearBtnDisabled =
    megaverseState !== "idle" ||
    currentMegaverseMap.every((row) =>
      row.every((cell) => cell.type === "SPACE"),
    );

  const matchMap = async () => {
    try {
      setMegaverseState("matching");
      showToast("Mapping megaverse, go grab a coffee!", "default");
      await matchMegaverseMap(currentDiff, setCurrentMap);
      setMegaverseState("idle");
      showToast("The megaverse has been matched!", "success");
    } catch {
      showToast("An error occured while matching the megaverse", "destructive");
    }
  };

  const clearMap = async () => {
    try {
      setMegaverseState("clearing");
      showToast("Clearing megaverse, go grab a coffee!", "default");
      await clearMegaverseMap(currentMap, setCurrentMap);
      setMegaverseState("idle");
      showToast("The megaverse has been cleared!", "success");
    } catch {
      showToast("An error occured while clearing the megaverse", "destructive");
    }
  };

  return (
    <>
      <Head>
        <title>Megaverse Mapper</title>
        <meta name="description" content="Crossmint Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-[#ffffff] ">
        <nav className="flex h-12 items-center justify-center gap-x-4 bg-gradient-to-br from-[#00ff85] to-[#00e0ff]">
          <h1 className="font-sans text-2xl">Megaverse Mapper</h1>
        </nav>
        <div className="mt-8 flex justify-center gap-x-32">
          <Megaverse title="Goal map" map={goalMap} />
          <Megaverse title="Current map" map={currentMegaverseMap} />
        </div>

        <div className="flex flex-col">
          <div className="mt-10 flex justify-center gap-x-4">
            <LoadingButton
              isLoading={megaverseState === "clearing"}
              onClick={() => {
                void clearMap();
              }}
              isDisabled={isClearBtnDisabled}
            >
              Clear map
            </LoadingButton>
            <LoadingButton
              isLoading={megaverseState === "matching"}
              isDisabled={isMatchBtnDisabled}
              onClick={() => {
                void matchMap();
              }}
            >
              Match map - {currentDiff.length} steps
            </LoadingButton>
          </div>
          <div className="mt-10 flex items-center justify-center">
            {megaverseState === "matching" && (
              <Progress
                value={100 - (currentDiff.length * 100) / initialDiff.length}
                className="w-96"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = (async () => {
  const candidateId = env.CANDIDATE_ID;
  const apiUrl = env.CROSSMINT_API_URL;

  // Get the goal map
  const goalMapParsed = await fetchGoalMap(candidateId, apiUrl);
  if (!goalMapParsed) {
    throw new Error("No goalMap found");
  }
  const goalMap = getGoalMap(goalMapParsed);

  // Get the current map
  const currentMapParsed = await fetchCurrentMap(candidateId, apiUrl);
  if (!currentMapParsed) {
    throw new Error("No currentMap found");
  }
  const currentMap = getCurrentMap(currentMapParsed);

  return {
    props: {
      goalMap,
      currentMap,
    },
  };
}) satisfies GetServerSideProps;

export default Home;
