const{Button,Badge,Select}=window.LMViC360DesignSystem_20f8b1;
const TYPES=['Full-time','Part-time','Contract','Internship'];
const MODES=[['Remote','Từ xa'],['Hybrid','Kết hợp'],['On-site','Tại văn phòng']];
const LEVELS=[['Entry-level','Mới bắt đầu'],['Mid-level','Trung cấp'],['Senior','Cấp cao']];
const PER=6;
function App(){
  const[lang,setLang]=useLang();
  const params=new URLSearchParams(location.search);
  const[q,setQ]=React.useState(params.get('q')||'');
  const[loc,setLoc]=React.useState(params.get('loc')||'');
  const[types,setTypes]=React.useState(params.get('type')?[params.get('type')]:[]);
  const[modes,setModes]=React.useState([]);
  const[levels,setLevels]=React.useState([]);
  const[company,setCompany]=React.useState(params.get('company')||'');
  const[sort,setSort]=React.useState('recent');
  const[page,setPage]=React.useState(1);
  const[saved,setSaved]=React.useState({});
  const[toast,setToast]=React.useState('');
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2000);return()=>clearTimeout(t);},[toast]);
  const toggle=(list,set,v)=>{set(list.includes(v)?list.filter(x=>x!==v):[...list,v]);setPage(1);};
  let jobs=window.LVData.jobs.filter(j=>{
    const hay=(j.title+' '+j.titleVi+' '+j.company+' '+j.skills.join(' ')).toLowerCase();
    if(q&&!hay.includes(q.toLowerCase()))return false;
    if(loc&&!(j.location+' '+j.locationVi).toLowerCase().includes(loc.toLowerCase()))return false;
    if(company&&j.company!==company)return false;
    if(types.length&&!types.includes(j.type))return false;
    if(modes.length&&!modes.includes(j.mode))return false;
    if(levels.length&&!levels.includes(j.level))return false;
    return true;
  });
  if(sort==='salary')jobs=[...jobs].sort((a,b)=>parseInt(b.salary)-parseInt(a.salary));
  if(sort==='title')jobs=[...jobs].sort((a,b)=>a.title.localeCompare(b.title));
  const pages=Math.max(1,Math.ceil(jobs.length/PER));
  const shown=jobs.slice((page-1)*PER,page*PER);
  const clearAll=()=>{setTypes([]);setModes([]);setLevels([]);setCompany('');setQ('');setLoc('');setPage(1);};
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="jobs.html" app="seeker"/>
    <main>
      <PageHead lang={lang} crumb={tr(lang,'Tìm việc làm','Find Jobs')} title={tr(lang,'Tìm công việc phù hợp với bạn.','Find the job that fits you.')} desc={tr(lang,'Tìm theo vị trí, kỹ năng, công ty và địa điểm trên toàn Việt Nam.','Search by role, skills, company and location across Vietnam.')}>
        <form className="lv-search-bar" onSubmit={(e)=>{e.preventDefault();setPage(1);}}>
          <div className="lv-search-field"><Icon name="search" size={18}/>
            <input type="text" value={q} onChange={e=>{setQ(e.target.value);setPage(1);}} placeholder={tr(lang,'Vị trí, kỹ năng hoặc công ty','Job title, skills or company')} aria-label={tr(lang,'Vị trí, kỹ năng hoặc công ty','Job title, skills or company')}/></div>
          <div className="lv-search-field lv-search-field-loc"><Icon name="map-pin" size={18}/>
            <input type="text" value={loc} onChange={e=>{setLoc(e.target.value);setPage(1);}} placeholder={tr(lang,'Địa điểm','Location')} aria-label={tr(lang,'Địa điểm','Location')}/></div>
          <Button variant="primary" size="lg" style={{whiteSpace:'nowrap'}}>{tr(lang,'Tìm việc','Search Jobs')}</Button>
        </form>
      </PageHead>
      <div className="lv-jobs-layout">
        <aside className="lv-sidebar" aria-label={tr(lang,'Bộ lọc','Filters')}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <strong style={{fontSize:'var(--text-base)'}}>{tr(lang,'Bộ lọc','Filters')}</strong>
            <button className="lv-quick-filter" onClick={clearAll}>{tr(lang,'Xóa hết','Clear all')}</button>
          </div>
          <div className="lv-filter-group"><h4>{tr(lang,'Hình thức làm việc','Employment type')}</h4>
            <div className="lv-filter-opts">{TYPES.map(t=><Check key={t} label={tr(lang,window.FILTER_VI[t],t)} checked={types.includes(t)} onChange={()=>toggle(types,setTypes,t)}/>)}</div></div>
          <div className="lv-filter-group"><h4>{tr(lang,'Cách làm việc','Work mode')}</h4>
            <div className="lv-filter-opts">{MODES.map(m=><Check key={m[0]} label={tr(lang,m[1],m[0])} checked={modes.includes(m[0])} onChange={()=>toggle(modes,setModes,m[0])}/>)}</div></div>
          <div className="lv-filter-group"><h4>{tr(lang,'Cấp bậc','Experience level')}</h4>
            <div className="lv-filter-opts">{LEVELS.map(l=><Check key={l[0]} label={tr(lang,l[1],l[0])} checked={levels.includes(l[0])} onChange={()=>toggle(levels,setLevels,l[0])}/>)}</div></div>
          <div className="lv-filter-group">
            <Field><Select label={tr(lang,'Công ty','Company')} placeholder={tr(lang,'Tất cả công ty','All companies')} value={company} onChange={e=>{setCompany(e.target.value);setPage(1);}} options={window.LVData.companies.map(c=>({value:c.name,label:c.name}))}/></Field>
          </div>
        </aside>
        <section>
          <div className="lv-results-bar">
            <div className="lv-results-count"><strong>{jobs.length}</strong> {tr(lang,'việc làm phù hợp','jobs match your search')}</div>
            <label className="lv-sort">{tr(lang,'Sắp xếp','Sort')}
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="recent">{tr(lang,'Mới nhất','Most recent')}</option>
                <option value="salary">{tr(lang,'Mức lương','Salary')}</option>
                <option value="title">{tr(lang,'Tên vị trí','Job title')}</option>
              </select></label>
          </div>
          {shown.length?<div className="lv-job-list">{shown.map(j=><JobRow key={j.id} job={j} lang={lang} saved={saved[j.id]} onSave={()=>{setSaved(s=>({...s,[j.id]:!s[j.id]}));setToast(saved[j.id]?tr(lang,'Đã bỏ lưu','Removed from saved jobs'):tr(lang,'Đã lưu việc làm','Job saved'));}}/>)}</div>
            :<div className="lv-empty"><h3>{tr(lang,'Không tìm thấy việc làm phù hợp','No jobs match those filters')}</h3>
              <p>{tr(lang,'Hãy thử điều chỉnh từ khóa hoặc xóa một vài bộ lọc.','Try adjusting your keywords or clearing a few filters.')}</p>
              <div style={{marginTop:20}}><Button variant="secondary" onClick={clearAll}>{tr(lang,'Xóa bộ lọc','Clear filters')}</Button></div></div>}
          {pages>1&&<nav className="lv-pager" aria-label={tr(lang,'Phân trang','Pagination')}>
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} aria-label={tr(lang,'Trang trước','Previous page')}>‹</button>
            {Array.from({length:pages}).map((_,i)=><button key={i} className={page===i+1?'active':''} aria-current={page===i+1?'page':undefined} onClick={()=>setPage(i+1)}>{i+1}</button>)}
            <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages} aria-label={tr(lang,'Trang sau','Next page')}>›</button>
          </nav>}
        </section>
      </div>
    </main>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
    <Toast msg={toast}/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
