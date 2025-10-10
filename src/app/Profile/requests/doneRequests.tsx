import { RequestCard } from "../components/RequestCard";

export default function  DoneRequest({data}:any) {
    return (
        <div className="my-6">
        {data?.map((item:any, index:number) => (
          
             
                 <RequestCard Status={item.status} Id={item.Id} CarName={item.CarName} Title={item.Title} paymentStatus={item.paymentStatus} Description={item.Description} />
             
          
       
         ))}
       </div>
    )
}