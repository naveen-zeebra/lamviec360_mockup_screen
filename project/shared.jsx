const{Button,Card,Badge,Avatar,Input,Select}=window.LMViC360DesignSystem_20f8b1;
function Reveal({children,as='div',style,className=''}){
  const ref=React.useRef(null);
  const[hidden,setHidden]=React.useState(false);
  React.useEffect(()=>{
    const el=ref.current;if(!el)return;
    const inView=()=>{const r=el.getBoundingClientRect();return r.top<window.innerHeight*0.95&&r.bottom>0;};
    if(inView())return;
    setHidden(true);
    const id=setInterval(()=>{if(inView()){setHidden(false);clearInterval(id);}},120);
    return()=>clearInterval(id);
  },[]);
  return React.createElement(as,{ref,className:`reveal ${hidden?'reveal-hidden':''} ${className}`,style},children);
}
const pascal=(n)=>n.split('-').map(p=>p.charAt(0).toUpperCase()+p.slice(1)).join('');
function Icon({name,size=20,style}){
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const el=ref.current;if(!el)return;
    el.textContent='';
    const L=window.lucide;if(!L)return;
    const node=(L.icons||{})[pascal(name)];
    if(!node||!L.createElement)return;
    try{
      const svg=L.createElement(node);
      svg.setAttribute('width',size);svg.setAttribute('height',size);
      svg.setAttribute('aria-hidden','true');svg.style.display='block';
      if(style&&style.fill)svg.setAttribute('fill',style.fill);
      el.appendChild(svg);
    }catch(e){}
  },[name,size,style&&style.fill]);
  return <span ref={ref} aria-hidden="true" style={{width:size,height:size,display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0,...style}}></span>;
}
const tr=(lang,vi,en)=>lang==='VI'?vi:en;
function useLang(){
  const[lang,set]=React.useState(()=>{try{return localStorage.getItem('lv360-lang')||'EN';}catch(e){return 'EN';}});
  const setLang=(l)=>{set(l);try{localStorage.setItem('lv360-lang',l);}catch(e){}};
  return[lang,setLang];
}
const SEEKER_NAV=[
  {href:'index.html',vi:'Trang chủ',en:'Home'},
  {href:'jobs.html',vi:'Tìm việc làm',en:'Find Jobs'},
  {href:'companies.html',vi:'Công ty',en:'Companies'},
  {href:'resources.html',vi:'Cẩm nang nghề nghiệp',en:'Career Resources'}
];
const EMPLOYER_NAV=[
  {href:'employers.html',vi:'Trang chủ',en:'Home'},
  {href:'solutions.html',vi:'Giải pháp',en:'Solutions'},
  {href:'pricing.html',vi:'Bảng giá',en:'Pricing'},
  {href:'employer-resources.html',vi:'Tài nguyên',en:'Resources'}
];
const LANGS=[{code:'EN',label:'English'},{code:'VI',label:'Tiếng Việt'}];
function LangPicker({lang,setLang,dark}){
  const[open,setOpen]=React.useState(false);
  return <div className="lv-dropdown">
    <button className={`lv-lang-btn ${dark?'on-dark':''}`} onClick={()=>setOpen(v=>!v)} aria-haspopup="listbox" aria-expanded={open} aria-label={tr(lang,'Chọn ngôn ngữ','Choose language')}>
      <Icon name="globe" size={14}/>{lang}<Icon name="chevron-down" size={14}/></button>
    {open&&<div className="lv-dropdown-menu" role="listbox">
      {LANGS.map(l=><button key={l.code} role="option" aria-selected={lang===l.code} onClick={()=>{setLang(l.code);setOpen(false);}}>{l.label}</button>)}
    </div>}
  </div>;
}
function Header({lang,setLang,current,app='seeker'}){
  const emp=app==='employer';
  const nav=emp?EMPLOYER_NAV:SEEKER_NAV;
  const[scrolled,setScrolled]=React.useState(false);
  const[mobileOpen,setMobileOpen]=React.useState(false);
  React.useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>8);
    window.addEventListener('scroll',f,{passive:true});
    const id=setInterval(f,200);
    return()=>{window.removeEventListener('scroll',f);clearInterval(id);};
  },[]);
  const switchHref=emp?'index.html':'employers.html';
  const switchLabel=emp?tr(lang,'Người tìm việc','Job Seeker'):tr(lang,'Nhà tuyển dụng','Employer / Company');
  return <header className={`lv-header ${scrolled?'lv-header-scrolled':''} ${emp?'lv-header-emp':''}`}>
    <div className="lv-header-inner">
      <a href={emp?'employers.html':'index.html'} className="lv-logo" aria-label={tr(lang,'LàmViệc360 — Trang chủ','LàmViệc360 — Home')}>
        <img src="assets/logo-cropped.png" alt="LàmViệc360"/>
      </a>
      <nav className="lv-nav" aria-label={tr(lang,'Điều hướng chính','Main navigation')}>
        {nav.map(n=><a key={n.href} href={n.href} className={current===n.href?'active':''} aria-current={current===n.href?'page':undefined}>{tr(lang,n.vi,n.en)}</a>)}
      </nav>
      <div className="lv-header-actions">
        <LangPicker lang={lang} setLang={setLang}/>
        <a href={switchHref} className="lv-switch-link">{switchLabel} <Icon name="arrow-right" size={14}/></a>
        <a href={emp?'employer-login.html':'login.html'} className="lv-login-link">{emp?tr(lang,'Đăng nhập Doanh nghiệp','Employer Login'):tr(lang,'Đăng nhập','Login')}</a>
        <Button variant="primary" size="md" style={{whiteSpace:'nowrap',flexShrink:0}} onClick={()=>location.href=emp?'company-register.html':'register.html'}>
          {emp?tr(lang,'Bắt đầu ngay','Get Started'):tr(lang,'Tạo tài khoản','Create Account')}</Button>
        <button className="lv-burger" aria-label={tr(lang,'Mở menu','Open menu')} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}><Icon name={mobileOpen?'x':'menu'} size={24}/></button>
      </div>
    </div>
    {mobileOpen&&<div className="lv-mobile-menu">
      <a href={switchHref} className="lv-switch-link lv-switch-link-mobile">{switchLabel} <Icon name="arrow-right" size={14}/></a>
      {nav.map(n=><a key={n.href} href={n.href}>{tr(lang,n.vi,n.en)}</a>)}
      <div className="lv-mobile-divider"></div>
      <a href={emp?'employer-login.html':'login.html'}>{emp?tr(lang,'Đăng nhập Doanh nghiệp','Employer Login'):tr(lang,'Đăng nhập','Login')}</a>
      <div style={{display:'flex',gap:'var(--space-2)',padding:'var(--space-2) 0'}}>
        {LANGS.map(l=><button key={l.code} className="lv-quick-filter" style={{fontWeight:lang===l.code?700:400}} onClick={()=>setLang(l.code)}>{l.label}</button>)}</div>
      <Button variant="primary" style={{width:'100%',justifyContent:'center'}} onClick={()=>location.href=emp?'company-register.html':'register.html'}>
        {emp?tr(lang,'Bắt đầu ngay','Get Started'):tr(lang,'Tạo tài khoản','Create Account')}</Button>
    </div>}
  </header>;
}
function Footer({lang,setLang,app='seeker'}){
  const emp=app==='employer';
  const cols=emp?[
    {t:['Giải pháp','Solutions'],links:[[['Đăng tin tuyển dụng','Job Posting'],'solutions.html#posting'],[['Tìm kiếm ứng viên','Candidate Search'],'solutions.html#search'],[['Quản lý ứng tuyển','Applicant Tracking'],'solutions.html#tracking'],[['Quản lý phỏng vấn','Interview Management'],'solutions.html#interviews'],[['Phân tích tuyển dụng','Hiring Analytics'],'solutions.html#analytics']]},
    {t:['Doanh nghiệp','Company'],links:[[['Bảng giá','Pricing'],'pricing.html'],[['Tài nguyên','Resources'],'employer-resources.html'],[['Đăng nhập Doanh nghiệp','Employer Login'],'employer-login.html'],[['Đăng ký doanh nghiệp','Company Registration'],'company-register.html']]},
    {t:['Người tìm việc','Job Seekers'],links:[[['Trang Người tìm việc','Job Seeker Home'],'index.html'],[['Tìm việc làm','Find Jobs'],'jobs.html'],[['Công ty','Companies'],'companies.html'],[['Cẩm nang nghề nghiệp','Career Resources'],'resources.html']]},
    {t:['Pháp lý','Legal'],links:[[['Chính sách bảo mật','Privacy Policy'],'employers.html#privacy'],[['Điều khoản dịch vụ','Terms of Service'],'employers.html#terms'],[['Bảo vệ dữ liệu','Data Protection'],'employers.html#data'],[['Minh bạch về AI','AI Transparency'],'employers.html#ai']]}
  ]:[
    {t:['Người tìm việc','Job Seekers'],links:[[['Tìm việc làm','Find Jobs'],'jobs.html'],[['Công ty','Companies'],'companies.html'],[['Cẩm nang nghề nghiệp','Career Resources'],'resources.html'],[['Hồ sơ của tôi','My Profile'],'login.html'],[['Đơn ứng tuyển của tôi','My Applications'],'login.html']]},
    {t:['Tài khoản','Account'],links:[[['Đăng nhập','Login'],'login.html'],[['Tạo tài khoản','Create Account'],'register.html'],[['Việc đã lưu','Saved Jobs'],'login.html'],[['Chuẩn bị phỏng vấn','Interview Preparation'],'resources.html']]},
    {t:['Nhà tuyển dụng','Employers'],links:[[['Trang Nhà tuyển dụng','Employer Home'],'employers.html'],[['Giải pháp','Solutions'],'solutions.html'],[['Bảng giá','Pricing'],'pricing.html'],[['Đăng nhập Doanh nghiệp','Employer Login'],'employer-login.html']]},
    {t:['Pháp lý','Legal'],links:[[['Chính sách bảo mật','Privacy Policy'],'index.html#privacy'],[['Điều khoản dịch vụ','Terms of Service'],'index.html#terms'],[['Chính sách Cookie','Cookie Policy'],'index.html#cookies'],[['Minh bạch về AI','AI Transparency'],'index.html#ai']]}
  ];
  return <footer className="lv-footer">
    <div className="lv-footer-inner">
      <div className="lv-footer-brand">
        <img src="assets/logo-cropped.png" alt="LàmViệc360" className="lv-footer-logo"/>
        <p>{tr(lang,'Kết nối Nhân tài với Cơ hội.','Connecting Talent with Opportunity.')}</p>
        <a href={emp?'index.html':'employers.html'} className="lv-footer-switch">
          {emp?tr(lang,'Bạn đang tìm việc?','Looking for a job?'):tr(lang,'Bạn đang tuyển dụng?','Are you hiring?')} <Icon name="arrow-right" size={14}/></a>
      </div>
      {cols.map(c=><div key={c.t[1]} className="lv-footer-col">
        <h4>{tr(lang,c.t[0],c.t[1])}</h4>
        {c.links.map(([lbl,href])=><a key={lbl[1]} href={href}>{tr(lang,lbl[0],lbl[1])}</a>)}
      </div>)}
    </div>
    <div className="lv-footer-lang">
      {LANGS.map(l=><a key={l.code} href="#" onClick={(e)=>{e.preventDefault();setLang&&setLang(l.code);}} style={{color:lang===l.code?'var(--text-inverse)':undefined,fontWeight:lang===l.code?700:400}}>{l.label}</a>)}
    </div>
    <div className="lv-footer-bottom">{tr(lang,'© LàmViệc360. Đã đăng ký bản quyền.','© LàmViệc360. All rights reserved.')}</div>
  </footer>;
}
function PageHead({lang,crumb,title,desc,children,home='index.html'}){
  return <section className="lv-page-head"><div className="lv-page-head-inner">
    <div className="lv-crumbs"><a href={home}>{tr(lang,'Trang chủ','Home')}</a><Icon name="chevron-right" size={14}/><span>{crumb}</span></div>
    <h1>{title}</h1>
    {desc&&<p>{desc}</p>}
    {children}
  </div></section>;
}
function JobRow({job,lang,saved,onSave}){
  return <article className="lv-jobrow">
    <div className="lv-job-logo" style={{width:52,height:52}} aria-hidden="true">{job.company.slice(0,2).toUpperCase()}</div>
    <div className="lv-jobrow-body">
      <h3 className="lv-job-title" style={{marginBottom:'var(--space-2)'}}><a href={`job-detail.html?id=${job.id}`} style={{color:'inherit'}}>{tr(lang,job.titleVi,job.title)}</a></h3>
      <div className="lv-job-company">{job.company}{job.verified&&<Badge tone="brand"><Icon name="check" size={11}/> {tr(lang,'Đã xác thực','Verified')}</Badge>}</div>
      <div className="lv-job-meta">
        <span><Icon name="map-pin" size={14}/>{tr(lang,job.locationVi,job.location)}</span>
        <span><Icon name="wallet" size={14}/>{job.salary}</span>
        <span><Icon name="clock" size={14}/>{tr(lang,job.postedVi,job.posted)}</span>
      </div>
      <div className="lv-job-tags">
        <Badge tone="neutral">{tr(lang,window.FILTER_VI[job.type]||job.type,job.type)}</Badge>
        <Badge tone="neutral">{tr(lang,job.modeVi,job.mode)}</Badge>
        <Badge tone="neutral">{tr(lang,job.levelVi,job.level)}</Badge>
      </div>
    </div>
    <div className="lv-jobrow-actions">
      <button className="lv-job-save" aria-label={saved?tr(lang,'Bỏ lưu việc','Unsave job'):tr(lang,'Lưu việc','Save job')} aria-pressed={!!saved} onClick={onSave}>
        <Icon name="heart" size={18} style={{fill:saved?'var(--red-500)':'none',color:saved?'var(--red-500)':'var(--gray-400)'}}/>
      </button>
      <Button variant="primary" size="sm" onClick={()=>location.href=`job-detail.html?id=${job.id}`}>{tr(lang,'Ứng tuyển','Apply')}</Button>
    </div>
  </article>;
}
function CompanyCard({c,lang}){
  return <div className="lv-company-card">
    <div className="lv-company-logo" aria-hidden="true">{c.name.slice(0,2).toUpperCase()}</div>
    <div className="lv-company-name">{c.name}</div>
    {c.verified&&<div><Badge tone="brand"><Icon name="shield-check" size={11}/> {tr(lang,'Đã xác thực','Verified Company')}</Badge></div>}
    <div className="lv-company-meta">
      <span><Icon name="building-2" size={14}/>{tr(lang,c.industryVi,c.industry)}</span>
      <span><Icon name="map-pin" size={14}/>{tr(lang,c.locationVi,c.location)}</span>
    </div>
    <div className="lv-company-foot">
      <strong style={{fontSize:'var(--text-sm)'}}>{c.openJobs} {tr(lang,'vị trí đang tuyển','Open Jobs')}</strong>
      <a href={`jobs.html?company=${encodeURIComponent(c.name)}`} className="lv-job-view">{tr(lang,'Xem công ty','View Company')} <Icon name="arrow-right" size={14}/></a>
    </div>
  </div>;
}
function Testimonials({lang,items,title,eyebrow}){
  return <section className="lv-section">
    <Reveal className="lv-section-head">
      {eyebrow&&<span className="lv-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
    </Reveal>
    <div className="lv-quote-grid">{items.map(t=><Reveal key={t.name}><figure className="lv-quote">
      <Icon name="quote" size={22} style={{color:'var(--blue-300)'}}/>
      <blockquote>{tr(lang,t.vi,t.en)}</blockquote>
      <figcaption><Avatar name={t.name} size={40}/><div><strong>{t.name}</strong><span>{tr(lang,t.roleVi,t.role)}</span></div></figcaption>
    </figure></Reveal>)}</div>
  </section>;
}
function Field({children}){return <label className="lv-field-wrap">{children}</label>;}
function Check({label,checked,onChange,id}){
  const ref=React.useRef('chk-'+Math.random().toString(36).slice(2,9));
  const cid=id||ref.current;
  return <div className="lv-check">
    <input type="checkbox" id={cid} checked={!!checked} onChange={onChange}/>
    <label htmlFor={cid}>{label}</label>
  </div>;
}
function SocialAuth({lang,providers}){
  return <div className="lv-social">
    {providers.map(p=><button key={p.label} type="button" className="lv-social-btn" onClick={(e)=>e.preventDefault()}>
      <span className="lv-social-mark" aria-hidden="true">{p.mark}</span>{tr(lang,'Tiếp tục với ','Continue with ')}{p.label}</button>)}
  </div>;
}
function AuthShell({lang,setLang,app,children,side}){
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="" app={app}/>
    <main className="lv-auth">
      <div className="lv-auth-form"><div className="lv-auth-inner">{children}</div></div>
      <aside className="lv-auth-side">{side}</aside>
    </main>
  </React.Fragment>;
}
function Toast({msg}){return msg?<div className="lv-toast" role="status"><Icon name="check-circle" size={16}/>{msg}</div>:null;}
function useToast(){
  const[msg,setMsg]=React.useState('');
  React.useEffect(()=>{if(!msg)return;const t=setTimeout(()=>setMsg(''),2400);return()=>clearTimeout(t);},[msg]);
  return[msg,setMsg];
}
Object.assign(window,{Reveal,Icon,tr,useLang,Header,Footer,PageHead,JobRow,CompanyCard,Testimonials,SocialAuth,AuthShell,Toast,useToast,LangPicker,Field,Check,SEEKER_NAV,EMPLOYER_NAV,LANGS});
