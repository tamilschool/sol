import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonWordProps {
  word: string[];
}

export default function SkeletonWord(props: SkeletonWordProps) {
  return (
    <div>
      {props.word.length === 0 &&
        <div>
          <div className={'grid grid-flow-col auto-cols-4 gap-2 pb-2'}>
            {[1, 2, 3, 4].map((_letter, index) => (
              <Skeleton key={index} className="bg-slate-100 content-center text-center border rounded drop-shadow min-w-12 min-h-8 sm:min-w-16 sm:min-h-16 font-bold">
                <p className="text-xl"></p>
              </Skeleton>
            ))}
          </div>
          <div className={'grid grid-flow-col auto-cols-4 gap-2'}>
            {[1, 2, 3, 4].map((_letter, index) => (
              <Skeleton key={index} className="content-center text-center border rounded shadow min-w-12 min-h-8 sm:min-w-16 sm:min-h-16">
                <p className="text-xl"></p>
              </Skeleton>
            ))}
          </div>
        </div>
      }
    </div>
  );
}