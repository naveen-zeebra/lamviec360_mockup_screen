const{Button,Badge,Input,Select}=window.LMViC360DesignSystem_20f8b1;
const STEPS=[
  {vi:'Tài khoản',en:'Account'},
  {vi:'Về bạn',en:'About you'},
  {vi:'Mong muốn',en:'Preferences'}
];
function Stepper({lang,step}){
  return <ol className="lv-stepper" aria-label={tr(lang,'Tiến trình đăng ký','Registration progress')}>
    {STEPS.map((s,i)=><li key={s.en} className={`lv-stepper-item ${i<step?'done':''} ${i===step?'current':''}`} aria-current={i===step?'step':undefined}>
      <span className="lv-stepper-dot">{i<step?<Icon name="check" size={14}/>:i+1}</span>
      <span className="lv-stepper-label">{tr(lang,s.vi,s.en)}</span>
    </li>)}
  </ol>;
}
function App(){
  const[lang,setLang]=useLang();
  const[step,setStep]=React.useState(0);
  const[f,setF]=React.useState({name:'',email:'',pw:'',title:'',exp:'',skills:'',loc:'',type:'',alerts:true});
  const[agree,setAgree]=React.useState(false);
  const[err,setErr]=React.useState('');
  const[toast,setToast]=useToast();
  const set=(k)=>(e)=>{setF(v=>({...v,[k]:e.target.value}));setErr('');};
  const locs=[...new Set(window.LVData.jobs.map(j=>tr(lang,j.locationVi,j.location)))];
  const next=(e)=>{
    e.preventDefault();
    if(step===0&&(!f.name.trim()||!f.email.trim()||f.pw.length<8)){
      setErr(tr(lang,'Vui lòng nhập họ tên, email và mật khẩu từ 8 ký tự.','Please enter your name, email and a password of at least 8 characters.'));return;}
    if(step===1&&!f.title.trim()){
      setErr(tr(lang,'Vui lòng cho biết vị trí bạn đang tìm kiếm.','Please tell us the role you are looking for.'));return;}
    if(step===2){
      if(!agree){setErr(tr(lang,'Vui lòng đồng ý với điều khoản để tiếp tục.','Please accept the terms to continue.'));return;}
      setToast(tr(lang,'Đây là bản mẫu — chưa có tài khoản thật','Prototype only — no real accounts yet'));return;}
    setErr('');setStep(s=>s+1);
  };
  const filled=[f.name,f.email,f.pw,f.title,f.exp,f.skills,f.loc,f.type].filter(x=>String(x).trim()).length;
  const pct=Math.round(filled/8*100);
  return <React.Fragment>
    <Header lang={lang} setLang={setLang} current="" app="seeker"/>
    <main className="lv-reg">
      <div className="lv-reg-inner">
        <Reveal className="lv-reg-form">
          <div className="lv-reg-head">
            <span className="lv-eyebrow">{tr(lang,'MIỄN PHÍ CHO NGƯỜI TÌM VIỆC','FREE FOR JOB SEEKERS')}</span>
            <h1>{tr(lang,'Tạo hồ sơ của bạn','Create your profile')}</h1>
            <p>{tr(lang,'Ba bước ngắn. Bạn có thể chỉnh sửa mọi thông tin sau khi tạo tài khoản.','Three short steps. You can edit everything later.')}</p>
          </div>
          <Stepper lang={lang} step={step}/>
          {step===0&&<React.Fragment>
            <SocialAuth lang={lang} providers={[{mark:'G',label:'Google'},{mark:'in',label:'LinkedIn'}]}/>
            <div className="lv-divider-text">{tr(lang,'hoặc đăng ký bằng email','or sign up with email')}</div>
          </React.Fragment>}
          <form className="lv-reg-fields" onSubmit={next}>
            {step===0&&<React.Fragment>
              <Field><Input label={tr(lang,'Họ và tên','Full name')} type="text" value={f.name} onChange={set('name')} placeholder={tr(lang,'Nguyễn Văn A','Nguyen Van A')}/></Field>
              <Field><Input label={tr(lang,'Email','Email')} type="email" value={f.email} onChange={set('email')} placeholder="you@email.com"/></Field>
              <Field><Input label={tr(lang,'Mật khẩu','Password')} type="password" value={f.pw} onChange={set('pw')} placeholder={tr(lang,'Tối thiểu 8 ký tự','At least 8 characters')}/></Field>
            </React.Fragment>}
            {step===1&&<React.Fragment>
              <Field><Input label={tr(lang,'Vị trí bạn tìm kiếm','Role you are looking for')} type="text" value={f.title} onChange={set('title')} placeholder={tr(lang,'Kỹ sư Backend','Backend Engineer')}/></Field>
              <Field><Select label={tr(lang,'Số năm kinh nghiệm','Years of experience')} placeholder={tr(lang,'Chọn kinh nghiệm','Select experience')} value={f.exp} onChange={set('exp')}
                options={(lang==='VI'?['Mới bắt đầu','1–3 năm','3–5 năm','5–10 năm','Trên 10 năm']:['Entry-level','1–3 years','3–5 years','5–10 years','10+ years']).map(x=>({value:x,label:x}))}/></Field>
              <Field><Input label={tr(lang,'Kỹ năng chính','Key skills')} type="text" value={f.skills} onChange={set('skills')} placeholder={tr(lang,'Node.js, SQL, AWS','Node.js, SQL, AWS')}/></Field>
            </React.Fragment>}
            {step===2&&<React.Fragment>
              <Field><Select label={tr(lang,'Địa điểm mong muốn','Preferred location')} placeholder={tr(lang,'Chọn địa điểm','Select a location')} value={f.loc} onChange={set('loc')}
                options={locs.map(l=>({value:l,label:l}))}/></Field>
              <Field><Select label={tr(lang,'Hình thức làm việc','Employment type')} placeholder={tr(lang,'Chọn hình thức','Select a type')} value={f.type} onChange={set('type')}
                options={['Full-time','Part-time','Contract','Internship'].map(t=>({value:t,label:tr(lang,window.FILTER_VI[t],t)}))}/></Field>
              <Check label={tr(lang,'Nhận thông báo việc làm phù hợp qua email','Email me jobs that match my profile')} checked={f.alerts} onChange={()=>setF(v=>({...v,alerts:!v.alerts}))}/>
              <Check label={tr(lang,'Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật','I agree to the Terms of Service and Privacy Policy')} checked={agree} onChange={()=>{setAgree(v=>!v);setErr('');}}/>
            </React.Fragment>}
            {err&&<p className="lv-error" role="alert"><Icon name="alert-circle" size={16}/><span>{err}</span></p>}
            <div className="lv-reg-actions">
              {step>0&&<Button variant="secondary" size="lg" type="button" onClick={()=>{setErr('');setStep(s=>s-1);}}>{tr(lang,'Quay lại','Back')}</Button>}
              <Button variant="primary" size="lg" style={{flex:1,justifyContent:'center'}}>
                {step===2?tr(lang,'Tạo tài khoản','Create Account'):tr(lang,'Tiếp tục','Continue')}</Button>
            </div>
          </form>
          <p className="lv-auth-note">{tr(lang,'Đã có tài khoản?','Already have an account?')}{' '}
            <a href="login.html" style={{fontWeight:700}}>{tr(lang,'Đăng nhập','Login')}</a></p>
          <div className="lv-cross-auth">
            <strong>{tr(lang,'Bạn là nhà tuyển dụng?','Are you an employer?')}</strong>
            <a href="company-register.html">{tr(lang,'Đăng ký tài khoản Doanh nghiệp','Register a Company Account')} <Icon name="arrow-right" size={14}/></a>
          </div>
        </Reveal>
        <Reveal className="lv-reg-aside">
          <div className="lv-reg-card">
            <div className="lv-reg-card-head">
              <strong>{tr(lang,'Hồ sơ của bạn','Your profile')}</strong>
              <Badge tone={pct>60?'success':'brand'}>{pct+'% '+tr(lang,'hoàn thiện','complete')}</Badge>
            </div>
            <div className="lv-progress"><i style={{width:Math.max(4,pct)+'%'}}></i></div>
            <dl className="lv-reg-summary">
              <div><dt>{tr(lang,'Họ và tên','Name')}</dt><dd>{f.name||'—'}</dd></div>
              <div><dt>{tr(lang,'Vị trí','Role')}</dt><dd>{f.title||'—'}</dd></div>
              <div><dt>{tr(lang,'Kinh nghiệm','Experience')}</dt><dd>{f.exp||'—'}</dd></div>
              <div><dt>{tr(lang,'Địa điểm','Location')}</dt><dd>{f.loc||'—'}</dd></div>
              <div><dt>{tr(lang,'Hình thức','Type')}</dt><dd>{f.type?tr(lang,window.FILTER_VI[f.type],f.type):'—'}</dd></div>
            </dl>
            <p className="lv-reg-hint"><Icon name="sparkles" size={15}/><span>{tr(lang,'Hồ sơ đầy đủ hơn giúp bạn nhận gợi ý việc làm chính xác hơn.','A fuller profile gets you more accurate job recommendations.')}</span></p>
          </div>
          <div className="lv-reg-benefits">
            <h2>{tr(lang,'Vì sao nên tạo hồ sơ','Why create a profile')}</h2>
            <ul className="lv-check-list">
              {(lang==='VI'?['Ứng tuyển nhiều vị trí mà không nhập lại thông tin.','Nhận gợi ý việc làm phù hợp với kỹ năng của bạn.','Theo dõi mọi đơn ứng tuyển ở một nơi.','Luôn miễn phí — bạn kiểm soát thông tin của mình.']
                :['Apply to many roles without re-entering your details.','Get job recommendations matched to your skills.','Track every application in one place.','Always free — you stay in control of your data.']).map(p=>
                <li key={p}><Icon name="check" size={16}/><span>{p}</span></li>)}
            </ul>
            <a href="jobs.html" className="lv-job-view">{tr(lang,'Xem việc làm trước ','Browse jobs first ')}<Icon name="arrow-right" size={14}/></a>
          </div>
        </Reveal>
      </div>
    </main>
    <Footer lang={lang} setLang={setLang} app="seeker"/>
    <Toast msg={toast}/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
