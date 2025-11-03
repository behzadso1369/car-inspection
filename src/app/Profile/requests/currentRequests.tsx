import { RequestCard } from "../components/RequestCard";

export default function  CurrentRequest({data}:any) {
    return (
        <div className="my-6">
        {data?.map((item:any, index:number) => (
          
             
                  <RequestCard Status={item.isComplete  ? "compepelted" : "unknown"} Id={item.id} CarName={item.carGroup} Title={item.isComplete ? "تکمیل شده" : "تکمیل نشده"} paymentStatus={item.flowState} Description={item.Description} />
             
          
        
         ))}
       </div>
    )
}