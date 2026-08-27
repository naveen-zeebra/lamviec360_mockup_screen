const{Button,Badge,Input,Select}=window.LMViC360DesignSystem_20f8b1;
function App(){
  const[lang,setLang]=useLang();
  const[f,setF]=React.useState({co:'',name:'',email:'',pw:'',ind:'',size:''});
  const[agree,setAgree]=React.useState(false);
  const[toast,setToast]=useToast();
  const set=(k)=>(e)=>setF(v=>({...v,[k]:e.target.value}));
  const side=<React.Fragment>
    <Badge tone="brand">{tr(lang,'Nhà tuyển dụng','For employers')}</Badge>
    <h2>{tr(lang,'Bắt đầu tuyển dụng trong vài phút.','Start hiring in minutes.')}</h2>
    <ul>{(lang==='VI'?['Đăng ký và được xác thực để ứng viên tin tưởng.','Thiết lập không gian làm việc riêng của doanh nghiệp.','Mời đội ngũ nhân sự với quyền theo vai trò.','Đăng tin tuyển dụng đầu tiên ngay hôm nay.']
      :['Register and get verified so candidates trust you.','Set up your own company workspace.','Invite your HR team with role-based access.','Publish your first job posting today.']).map(p=>
      <li key={p}><Icon name="check" size={16}/><span>{p}</span></li>)}</ul>
    <a href="pricing.html" style={{color:'var(--blue-300)',fontWeight:600,fontSize:'var(--text-sm)'}}>{tr(lang,'Xem bảng giá →','See pricing →')}</a>
  </React.Fragment>;
  return <React.Fragment>
    <AuthShell lang={lang} setLang={setLang} app="employer" side={side}>
      <h1>{tr(lang,'Đăng ký tài khoản Doanh nghiệp','Create your company account')}</h1>
      <p>{tr(lang,'Doanh nghiệp của bạn sẽ được xem xét trước khi nhận huy hiệu đã xác thực.','Your company is reviewed before it receives a verified badge.')}</p>
      <SocialAuth lang={lang} providers={[{mark:'G',label:'Google'},{mark:'MS',label:'Microsoft'}]}/>
      <div className="lv-divider-text">{tr(lang,'hoặc dùng email công việc','or use your work email')}</div>
      <form style={{display:'flex',flexDirection:'column',gap:'var(--space-4)'}} onSubmit={(e)=>{e.preventDefault();
        if(!agree){setToast(tr(lang,'Vui lòng đồng ý với điều khoản để tiếp tục','Please accept the terms to continue'));return;}
        setToast(tr(lang,'Đây là bản mẫu — chưa có tài khoản thật','Prototype only — no real accounts yet'));}}>
        <Field><Input label={tr(lang,'Tên doanh nghiệp','Company name')} type="text" value={f.co} onChange={set('co')} placeholder="ABC Technologies"/></Field>
        <Field><Input label={tr(lang,'Người liên hệ','Contact name')} type="text" value={f.name} onChange={set('name')} placeholder={tr(lang,'Nguyễn Văn A','Nguyen Van A')}/></Field>
        <Field><Input label={tr(lang,'Email công việc','Work email')} type="email" value={f.email} onChange={set('email')} placeholder="hr@company.com"/></Field>
        <Field><Input label={tr(lang,'Mật khẩu','Password')} type="password" value={f.pw} onChange={set('pw')} placeholder={tr(lang,'Tối thiểu 8 ký tự','At least 8 characters')}/></Field>
        <Field><Select label={tr(lang,'Ngành nghề','Industry')} placeholder={tr(lang,'Chọn ngành nghề','Select an industry')} value={f.ind} onChange={set('ind')}
          options={[...new Set(window.LVData.companies.map(c=>tr(lang,c.industryVi,c.industry)))].map(i=>({value:i,label:i}))}/></Field>
        <Field><Select label={tr(lang,'Quy mô công ty','Company size')} placeholder={tr(lang,'Chọn quy mô','Select a size')} value={f.size} onChange={set('size')}
          options={['1–10','11–50','51–200','201–500','500+'].map(s=>({value:s,label:s+' '+tr(lang,'nhân viên','employees')}))}/></Field>
        <Check label={tr(lang,'Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật','I agree to the Terms of Service and Privacy Policy')} checked={agree} onChange={()=>setAgree(v=>!v)}/>
        <Button variant="primary" size="lg" style={{width:'100%',justifyContent:'center'}}>{tr(lang,'Tạo tài khoản Doanh nghiệp','Create Company Account')}</Button>
      </form>
      <p className="lv-auth-note">{tr(lang,'Doanh nghiệp của bạn đã có tài khoản?','Company already registered?')}{' '}
        <a href="employer-login.html" style={{fontWeight:700}}>{tr(lang,'Đăng nhập Doanh nghiệp','Employer Login')}</a></p>
      <div className="lv-cross-auth">
        <strong>{tr(lang,'Bạn đang tìm việc?','Looking for a job?')}</strong>
        <a href="register.html">{tr(lang,'Tạo tài khoản Người tìm việc','Create a Job Seeker Account')} <Icon name="arrow-right" size={14}/></a>
      </div>
    </AuthShell>
    <Footer lang={lang} setLang={setLang} app="employer"/>
    <Toast msg={toast}/>
  </React.Fragment>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
