import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { CoffeeLot } from "@/lib/types";

export function LotCard({ lot }: { lot: CoffeeLot }) { return <article className="lot-card"><div className="lot-card-top"><span className={`status ${lot.status.toLowerCase()}`}>{lot.status.replaceAll("_", " ")}</span><span className="lot-code">{lot.code}</span></div><div className="lot-type">{lot.coffeeType}</div><h3><Link href={`/coffee/${lot.slug}`}>{lot.name}</Link></h3><p className="origin"><MapPin size={15}/>{lot.region} · {lot.altitude}</p><div className="flavour-row">{lot.cupProfile.slice(0,3).map(n=><span key={n}>{n}</span>)}</div><dl className="lot-metrics"><div><dt>Process</dt><dd>{lot.process}</dd></div><div><dt>Available</dt><dd>{lot.availableQuantity}</dd></div><div><dt>FOB indicative</dt><dd>{lot.fobPrice}</dd></div></dl><Link href={`/coffee/${lot.slug}`} className="text-link">View lot details <ArrowUpRight size={16}/></Link></article> }
