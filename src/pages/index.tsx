import { type InferGetServerSidePropsType, type NextPage } from "next";
import { type GetServerSideProps } from "next";
import Head from "next/head";

import { env } from "~/env.mjs";
import { getGoalMap } from "~/server/api/utils/megaverse/goal-map/get-goal-map";
import { getCurrentMap } from "~/server/api/utils/megaverse/current-map/get-current-map";
import { api } from "~/server/api/utils/api";
import { useRouter } from "next/router";
import { mapDiff } from "~/utils/map-diff";
import { useToast } from "~/components/ui/use-toast";
import { fetchCurrentMap } from "~/server/api/utils/megaverse/current-map/current-map-api";
import { fetchGoalMap } from "~/server/api/utils/megaverse/goal-map/goal-map-api";
import { LoadingButton } from "~/components/loading-button";
import { Megaverse } from "~/components/megaverse";

type ToastVariant = "default" | "success" | "destructive";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ currentMap, goalMap }) => {
  const router = useRouter();

  const megaverseDiff = mapDiff({ currentMap, goalMap });

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

  const { mutate: matchMutate, isLoading: isMatchLoading } =
    api.goalMap.match.useMutation({
      onError: (error) => {
        showToast(error.message, "destructive");
      },
      onSuccess: () => {
        router.reload();
        showToast("The megaverse has been matched!", "success");
      },
      onMutate: () => {
        showToast("Mapping megaverse, go grab a coffee!", "default");
      },
    });

  const { mutate: clearMutate, isLoading: isClearLoading } =
    api.goalMap.clear.useMutation({
      onError: (error) => {
        showToast(error.message, "destructive");
      },
      onSuccess: () => {
        router.reload();
        showToast("The megaverse has been cleared!", "success");
      },
      onMutate: () => {
        showToast("Clearing megaverse, go grab a coffee!", "default");
      },
    });

  const isMatchBtnDisabled =
    megaverseDiff.length === 0 || isMatchLoading || isClearLoading;

  const isClearBtnDisabled =
    isClearLoading ||
    isMatchLoading ||
    currentMap.every((item) => item.every((item) => item.type === "SPACE"));

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
          <Megaverse title="Current map" map={currentMap} />
        </div>

        <div className="flex justify-center">
          <div className="mt-20 flex gap-x-4">
            <LoadingButton
              isLoading={isClearLoading}
              onClick={() => clearMutate({ currentMap })}
              isDisabled={isClearBtnDisabled}
            >
              Clear map
            </LoadingButton>
            <LoadingButton
              isLoading={isMatchLoading}
              isDisabled={isMatchBtnDisabled}
              onClick={() => matchMutate(megaverseDiff)}
            >
              Match map - {megaverseDiff.length} steps
            </LoadingButton>
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
