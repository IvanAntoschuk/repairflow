import { RepairsFilters } from "./RepairsFilters";
import { RepairsJournalHeader } from "./RepairsJournalHeader";
import { RepairsKpiCards } from "./RepairsKpiCards";
import { RepairsSlaBanner } from "./RepairsSlaBanner";
import { RepairsTable } from "./RepairsTable";

export const RepairsJournal = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-space-lg py-gutter-desktop">
      <RepairsJournalHeader />
      <RepairsKpiCards />
      <RepairsFilters />
      <RepairsTable />
      <RepairsSlaBanner />
    </div>
  );
};
