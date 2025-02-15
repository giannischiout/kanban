
import {KanbanView} from "@/app/_sections/kanban/view";


type Props = {
  params: Promise<{tab: string}>
}



export default async function Page({params}: Props){
  return (
    <KanbanView />
  );
}




