/* @ds-bundle: {"format":4,"namespace":"LMViC360DesignSystem_20f8b1","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"d9481cdc272a","components/core/Badge.jsx":"594b50f13e05","components/core/Button.jsx":"03f6cf07c2aa","components/core/Card.jsx":"fb994e8877c1","components/core/IconButton.jsx":"de9685eab43a","components/core/Tag.jsx":"90256b348248","components/feedback/Dialog.jsx":"57c90172c5d8","components/feedback/Toast.jsx":"b1e29e51fb35","components/feedback/Tooltip.jsx":"4a398d2f6ec2","components/forms/Checkbox.jsx":"3dcb7a7fdac5","components/forms/Input.jsx":"48964f88205f","components/forms/Radio.jsx":"c1efb673e654","components/forms/Select.jsx":"31dc057e427a","components/forms/Switch.jsx":"4a84cf0b931f","components/navigation/Tabs.jsx":"764a13545d62","ui_kits/employer/screens.jsx":"8f8735f0fe4f","ui_kits/job-seeker/screens.jsx":"d891e8b040af"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.LMViC360DesignSystem_20f8b1 = window.LMViC360DesignSystem_20f8b1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function Avatar({
  src,
  name = '',
  size = 40,
  shape = 'circle'
}) {
  const initials = name.split(' ').filter(Boolean).slice(-2).map(w => w[0]).join('').toUpperCase();
  const radius = shape === 'circle' ? '50%' : 'var(--radius-md)';
  if (src) return React.createElement('img', {
    src,
    alt: name,
    style: {
      width: size,
      height: size,
      borderRadius: radius,
      objectFit: 'cover',
      border: '1px solid var(--border-default)'
    }
  });
  return React.createElement('div', {
    style: {
      width: size,
      height: size,
      borderRadius: radius,
      background: 'var(--blue-100)',
      color: 'var(--blue-700)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: size * 0.38
    }
  }, initials || '?');
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    bg: 'var(--gray-100)',
    fg: 'var(--text-secondary)'
  },
  brand: {
    bg: 'var(--surface-brand-subtle)',
    fg: 'var(--text-brand)'
  },
  success: {
    bg: 'var(--color-success-bg)',
    fg: 'var(--color-success-text)'
  },
  warning: {
    bg: 'var(--color-warning-bg)',
    fg: 'var(--color-warning-text)'
  },
  error: {
    bg: 'var(--color-error-bg)',
    fg: 'var(--color-error-text)'
  }
};
function Badge({
  tone = 'neutral',
  children
}) {
  const t = TONES[tone] || TONES.neutral;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 'var(--text-xs)',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      letterSpacing: 'var(--tracking-wide)'
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    padding: '6px 14px',
    fontSize: 'var(--text-sm)'
  },
  md: {
    padding: '10px 20px',
    fontSize: 'var(--text-base)'
  },
  lg: {
    padding: '13px 26px',
    fontSize: 'var(--text-md)'
  }
};
const VARIANTS = {
  primary: {
    background: 'var(--surface-brand)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-brand)',
    border: '1.5px solid var(--border-brand)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent'
  },
  danger: {
    background: 'var(--color-error)',
    color: 'var(--text-inverse)',
    border: '1px solid transparent'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  children,
  onClick,
  style
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  return React.createElement('button', {
    onClick,
    disabled,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background var(--duration-fast) var(--ease-standard), opacity var(--duration-fast)',
      opacity: disabled ? 0.5 : 1,
      ...v,
      ...s,
      ...style
    }
  }, icon && iconPosition === 'left' ? React.createElement('img', {
    src: icon,
    alt: '',
    style: {
      width: 16,
      height: 16,
      filter: variant === 'primary' || variant === 'danger' ? 'invert(1) brightness(2)' : 'none'
    }
  }) : null, children, icon && iconPosition === 'right' ? React.createElement('img', {
    src: icon,
    alt: '',
    style: {
      width: 16,
      height: 16,
      filter: variant === 'primary' || variant === 'danger' ? 'invert(1) brightness(2)' : 'none'
    }
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = '20px',
  hoverable = false,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding,
      transition: 'box-shadow var(--duration-normal) var(--ease-standard), transform var(--duration-normal)',
      cursor: hoverable ? 'pointer' : 'default',
      ...style
    },
    onMouseEnter: hoverable ? e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    } : undefined
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  size = 36,
  variant = 'ghost',
  onClick,
  style
}) {
  const bg = variant === 'filled' ? 'var(--surface-brand)' : variant === 'subtle' ? 'var(--surface-brand-subtle)' : 'transparent';
  const filter = variant === 'filled' ? 'invert(1) brightness(2)' : 'none';
  return React.createElement('button', {
    onClick,
    'aria-label': label,
    title: label,
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-md)',
      border: variant === 'outline' ? '1px solid var(--border-default)' : 'none',
      background: bg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background var(--duration-fast)',
      ...style
    }
  }, React.createElement('img', {
    src: icon,
    alt: '',
    style: {
      width: size * 0.5,
      height: size * 0.5,
      filter
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  onRemove,
  selected = false
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      background: selected ? 'var(--surface-brand)' : 'var(--gray-100)',
      color: selected ? 'var(--text-inverse)' : 'var(--text-secondary)',
      border: '1px solid ' + (selected ? 'transparent' : 'var(--border-default)')
    }
  }, children, onRemove ? React.createElement('span', {
    onClick: onRemove,
    style: {
      cursor: 'pointer',
      opacity: 0.7
    }
  }, '×') : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose,
  footer
}) {
  if (!open) return null;
  return React.createElement('div', {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(21,23,27,0.45)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }
  }, React.createElement('div', {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      width: 420,
      maxWidth: '90vw',
      padding: '24px',
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      color: 'var(--text-primary)'
    }
  }, title), React.createElement('span', {
    onClick: onClose,
    style: {
      cursor: 'pointer',
      color: 'var(--text-tertiary)',
      fontSize: 20
    }
  }, '×')), React.createElement('div', {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, children), footer && React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  success: {
    bg: 'var(--color-success-bg)',
    fg: 'var(--color-success-text)',
    bar: 'var(--color-success)'
  },
  error: {
    bg: 'var(--color-error-bg)',
    fg: 'var(--color-error-text)',
    bar: 'var(--color-error)'
  },
  info: {
    bg: 'var(--color-info-bg)',
    fg: 'var(--color-info-text)',
    bar: 'var(--color-info)'
  }
};
function Toast({
  tone = 'info',
  title,
  description
}) {
  const t = TONES[tone] || TONES.info;
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: '12px',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      padding: '14px 16px',
      minWidth: 280,
      maxWidth: 360,
      fontFamily: 'var(--font-body)',
      borderLeft: '4px solid ' + t.bar
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)'
    }
  }, title), description && React.createElement('div', {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const {
  useState
} = React;
function Tooltip({
  label,
  children
}) {
  const [show, setShow] = useState(false);
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && React.createElement('span', {
    style: {
      position: 'absolute',
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--gray-900)',
      color: '#fff',
      fontSize: 'var(--text-xs)',
      fontFamily: 'var(--font-body)',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--shadow-md)',
      zIndex: 10
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-xs)',
      border: '1.5px solid ' + (checked ? 'var(--surface-brand)' : 'var(--border-strong)'),
      background: checked ? 'var(--surface-brand)' : 'var(--surface-card)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'background var(--duration-fast)'
    }
  }, checked && React.createElement('span', {
    style: {
      color: '#fff',
      fontSize: 13,
      fontWeight: 700,
      lineHeight: 1
    }
  }, '✓')), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const {
  useState
} = React;
function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  size = 'md'
}) {
  const [focused, setFocused] = useState(false);
  const pad = size === 'sm' ? '8px 12px' : '11px 14px';
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: pad,
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid ' + (error ? 'var(--color-error)' : focused ? 'var(--border-focus)' : 'var(--border-default)'),
      background: 'var(--surface-card)',
      boxShadow: focused ? 'var(--focus-ring)' : 'none',
      transition: 'box-shadow var(--duration-fast)'
    }
  }, icon && React.createElement('img', {
    src: icon,
    alt: '',
    style: {
      width: 16,
      height: 16,
      opacity: 0.6
    }
  }), React.createElement('input', {
    type,
    placeholder,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      border: 'none',
      outline: 'none',
      flex: 1,
      fontSize: 'var(--text-base)',
      fontFamily: 'var(--font-body)',
      background: 'transparent',
      color: 'var(--text-primary)'
    }
  })), error && React.createElement('span', {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange,
  name
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(),
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      border: '1.5px solid ' + (checked ? 'var(--surface-brand)' : 'var(--border-strong)'),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked && React.createElement('span', {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--surface-brand)'
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Chọn...'
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-body)'
    }
  }, label && React.createElement('label', {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label), React.createElement('select', {
    value,
    onChange,
    style: {
      padding: '11px 14px',
      borderRadius: 'var(--radius-md)',
      border: '1.5px solid var(--border-default)',
      background: 'var(--surface-card)',
      fontSize: 'var(--text-base)',
      color: value ? 'var(--text-primary)' : 'var(--text-tertiary)',
      fontFamily: 'var(--font-body)'
    }
  }, React.createElement('option', {
    value: ''
  }, placeholder), options.map((o, i) => React.createElement('option', {
    key: i,
    value: o.value || o
  }, o.label || o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-primary)'
    }
  }, React.createElement('span', {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 40,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--surface-brand)' : 'var(--gray-300)',
      position: 'relative',
      transition: 'background var(--duration-fast)',
      flexShrink: 0
    }
  }, React.createElement('span', {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: 'var(--shadow-xs)',
      transition: 'left var(--duration-fast) var(--ease-standard)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const {
  useState
} = React;
function Tabs({
  tabs = [],
  defaultIndex = 0,
  onChange
}) {
  const [active, setActive] = useState(defaultIndex);
  const select = i => {
    setActive(i);
    onChange && onChange(i);
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: '4px',
      borderBottom: '1.5px solid var(--border-default)',
      fontFamily: 'var(--font-body)'
    }
  }, tabs.map((t, i) => React.createElement('div', {
    key: i,
    onClick: () => select(i),
    style: {
      padding: '10px 18px',
      fontWeight: 600,
      fontSize: 'var(--text-base)',
      cursor: 'pointer',
      color: active === i ? 'var(--text-brand)' : 'var(--text-secondary)',
      borderBottom: '2.5px solid ' + (active === i ? 'var(--surface-brand)' : 'transparent'),
      marginBottom: '-1.5px',
      transition: 'color var(--duration-fast)'
    }
  }, t)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/employer/screens.jsx
try { (() => {
const {
  Button,
  IconButton,
  Badge,
  Tag,
  Avatar,
  Card,
  Input,
  Select,
  Tabs,
  Switch
} = window.LMViC360DesignSystem_20f8b1;
function Sidebar({
  active,
  onNav
}) {
  const items = [['dashboard', 'layout-dashboard', 'Tổng quan'], ['jobs', 'briefcase', 'Tin tuyển dụng'], ['candidates', 'users', 'Ứng viên'], ['company', 'building-2', 'Hồ sơ công ty']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220,
      flexShrink: 0,
      background: 'var(--surface-inverse)',
      minHeight: '100%',
      padding: '20px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 10px 20px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.jpeg",
    style: {
      height: 24,
      filter: 'brightness(0) invert(1)'
    }
  })), items.map(([k, icon, label]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => onNav(k),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: active === k ? '#fff' : 'var(--blue-200)',
      background: active === k ? 'rgba(255,255,255,0.12)' : 'transparent',
      fontWeight: 600,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 17,
      height: 17
    }
  }), label)));
}
function TopBar({
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 28px',
      borderBottom: '1px solid var(--border-default)',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 20
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 19,
      height: 19,
      color: 'var(--text-secondary)'
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "FPT Software",
    shape: "square",
    size: 32
  })));
}
function StatCard({
  label,
  value,
  icon,
  tone = 'brand'
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 800,
      marginTop: 6
    }
  }, value)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-brand-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 18,
      height: 18,
      color: 'var(--text-brand)'
    }
  }))));
}
function DashboardScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopBar, {
    title: "T\u1ED5ng quan"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Tin \u0111ang tuy\u1EC3n",
    value: "12",
    icon: "briefcase"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "\u1EE8ng vi\xEAn m\u1EDBi",
    value: "47",
    icon: "users"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Ph\u1ECFng v\u1EA5n tu\u1EA7n n\xE0y",
    value: "8",
    icon: "calendar"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "\u0110\xE3 tuy\u1EC3n th\xE1ng n\xE0y",
    value: "3",
    icon: "check-circle"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 14
    }
  }, "Tin tuy\u1EC3n d\u1EE5ng g\u1EA7n \u0111\xE2y"), [{
    t: 'Chuyên viên Nhân sự',
    c: 23,
    tone: 'success'
  }, {
    t: 'Frontend Developer',
    c: 41,
    tone: 'brand'
  }, {
    t: 'Nhân viên Kinh doanh',
    c: 9,
    tone: 'neutral'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderTop: i ? '1px solid var(--border-default)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 14
    }
  }, r.c, " \u1EE9ng vi\xEAn"), /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone
  }, "\u0110ang tuy\u1EC3n")))))));
}
function JobsScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopBar, {
    title: "Tin tuy\u1EC3n d\u1EE5ng"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "T\xECm tin tuy\u1EC3n d\u1EE5ng...",
    style: {
      width: 320
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: null
  }, "+ \u0110\u0103ng tin m\u1EDBi")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [{
    t: 'Chuyên viên Nhân sự',
    loc: 'Hà Nội',
    apps: 23,
    status: 'success',
    label: 'Đang tuyển'
  }, {
    t: 'Frontend Developer',
    loc: 'TP.HCM',
    apps: 41,
    status: 'success',
    label: 'Đang tuyển'
  }, {
    t: 'AI Product Manager',
    loc: 'TP.HCM',
    apps: 15,
    status: 'warning',
    label: 'Chờ duyệt'
  }, {
    t: 'Thực tập sinh Marketing',
    loc: 'Đà Nẵng',
    apps: 6,
    status: 'neutral',
    label: 'Đã đóng'
  }].map((j, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "16px 20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, j.t), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 13,
      marginTop: 2
    }
  }, j.loc, " \xB7 ", j.apps, " \u1EE9ng vi\xEAn")), /*#__PURE__*/React.createElement(Badge, {
    tone: j.status
  }, j.label)))))));
}
function CandidatesScreen() {
  const stages = [['Mới ứng tuyển', ['Trần Thị Bích', 'Lê Văn Cường', 'Phạm Thu Hà']], ['Sàng lọc', ['Đỗ Minh Khôi']], ['Phỏng vấn', ['Vũ Ngọc Lan']], ['Đề nghị', ['Hoàng Anh Tuấn']]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopBar, {
    title: "\u1EE8ng vi\xEAn"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      gap: 16,
      overflowX: 'auto'
    }
  }, stages.map(([label, people], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 230,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 10,
      color: 'var(--text-secondary)'
    }
  }, label, " \xB7 ", people.length), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, people.map((p, j) => /*#__PURE__*/React.createElement(Card, {
    key: j,
    padding: "14px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p,
    size: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, p)))))))));
}
function CompanyScreen() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopBar, {
    title: "H\u1ED3 s\u01A1 c\xF4ng ty"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "FPT Software",
    shape: "square",
    size: 64
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18
    }
  }, "FPT Software"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 14,
      marginTop: 2
    }
  }, "C\xF4ng ngh\u1EC7 th\xF4ng tin \xB7 H\xE0 N\u1ED9i ", /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "\u0110\xE3 x\xE1c th\u1EF1c"))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 14
    }
  }, "C\xE0i \u0111\u1EB7t nh\xF3m"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: true,
    label: "Cho ph\xE9p th\xE0nh vi\xEAn nh\xF3m xem t\u1EA5t c\u1EA3 \u1EE9ng vi\xEAn"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "T\u1EF1 \u0111\u1ED9ng g\u1EE3i \xFD \u1EE9ng vi\xEAn b\u1EB1ng AI"
  })))));
}
window.EmployerScreens = {
  Sidebar,
  DashboardScreen,
  JobsScreen,
  CandidatesScreen,
  CompanyScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/employer/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/job-seeker/screens.jsx
try { (() => {
const {
  Button,
  IconButton,
  Badge,
  Tag,
  Avatar,
  Card,
  Input,
  Select,
  Checkbox,
  Tabs
} = window.LMViC360DesignSystem_20f8b1;
function Header({
  active,
  onNav
}) {
  const items = [['search', 'Việc làm'], ['applications', 'Đơn ứng tuyển'], ['profile', 'Hồ sơ']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 32px',
      background: '#fff',
      borderBottom: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo.jpeg",
    style: {
      height: 28
    },
    alt: "L\xE0mVi\u1EC7c360"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, items.map(([k, label]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => onNav(k),
    style: {
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: 15,
      padding: '6px 2px',
      color: active === k ? 'var(--text-brand)' : 'var(--text-secondary)',
      borderBottom: '2px solid ' + (active === k ? 'var(--surface-brand)' : 'transparent')
    }
  }, label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bell",
    style: {
      width: 20,
      height: 20,
      color: 'var(--text-secondary)'
    }
  }), /*#__PURE__*/React.createElement(Avatar, {
    name: "Nguy\u1EC5n V\u0103n An",
    size: 34
  })));
}
const JOBS = [{
  id: 1,
  title: 'Chuyên viên Nhân sự (HR Generalist)',
  company: 'FPT Software',
  loc: 'Hà Nội',
  type: 'Toàn thời gian',
  salary: '15–20 triệu',
  posted: '2 ngày trước',
  tags: ['Nhân sự', 'Tuyển dụng'],
  verified: true
}, {
  id: 2,
  title: 'Frontend Developer (ReactJS)',
  company: 'Tiki Corporation',
  loc: 'TP. Hồ Chí Minh',
  type: 'Toàn thời gian',
  salary: '22–30 triệu',
  posted: '5 giờ trước',
  tags: ['React', 'JavaScript'],
  verified: true
}, {
  id: 3,
  title: 'Nhân viên Kinh doanh B2B',
  company: 'Viettel Telecom',
  loc: 'Đà Nẵng',
  type: 'Toàn thời gian',
  salary: 'Thỏa thuận',
  posted: '1 tuần trước',
  tags: ['Kinh doanh'],
  verified: false
}, {
  id: 4,
  title: 'AI Product Manager',
  company: 'VNG Corporation',
  loc: 'TP. Hồ Chí Minh',
  type: 'Toàn thời gian',
  salary: '35–45 triệu',
  posted: 'Hôm nay',
  tags: ['AI', 'Sản phẩm'],
  verified: true
}];
function JobCard({
  job,
  onOpen,
  saved,
  onToggleSave
}) {
  return /*#__PURE__*/React.createElement(Card, {
    hoverable: true,
    onClick: () => onOpen(job),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: job.company,
    shape: "square",
    size: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--text-primary)'
    }
  }, job.title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 14,
      marginTop: 2
    }
  }, job.company, " ", job.verified && /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "\u0110\xE3 x\xE1c th\u1EF1c"))), /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      e.stopPropagation();
      onToggleSave(job.id);
    },
    title: "L\u01B0u tin",
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "bookmark",
    style: {
      width: 18,
      height: 18,
      color: saved.includes(job.id) ? 'var(--text-brand)' : 'var(--text-tertiary)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 10,
      color: 'var(--text-tertiary)',
      fontSize: 13,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "map-pin",
    style: {
      width: 14,
      height: 14
    }
  }), job.loc), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "clock",
    style: {
      width: 14,
      height: 14
    }
  }), job.type), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "wallet",
    style: {
      width: 14,
      height: 14
    }
  }), job.salary)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, job.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 12,
      color: 'var(--text-tertiary)',
      textAlign: 'right'
    }
  }, job.posted));
}
function SearchScreen({
  onOpen,
  saved,
  onToggleSave
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      padding: '28px 32px',
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15
    }
  }, "B\u1ED9 l\u1ECDc"), /*#__PURE__*/React.createElement(Select, {
    label: "T\u1EC9nh/Th\xE0nh ph\u1ED1",
    options: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng']
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Ng\xE0nh ngh\u1EC1",
    options: ['Nhân sự', 'Công nghệ thông tin', 'Kinh doanh']
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      marginBottom: 8
    }
  }, "H\xECnh th\u1EE9c"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "To\xE0n th\u1EDDi gian",
    checked: true
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "B\xE1n th\u1EDDi gian"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "T\u1EEB xa"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-brand-subtle)',
      borderRadius: 'var(--radius-md)',
      padding: 14,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "sparkles",
    style: {
      width: 18,
      height: 18,
      color: 'var(--text-brand)',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-brand)',
      lineHeight: 1.5
    }
  }, "AI g\u1EE3i \xFD vi\u1EC7c l\xE0m ph\xF9 h\u1EE3p v\u1EDBi h\u1ED3 s\u01A1 c\u1EE7a b\u1EA1n"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "T\xECm theo v\u1ECB tr\xED, c\xF4ng ty, k\u1EF9 n\u0103ng...",
    icon: null
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, JOBS.length, " vi\u1EC7c l\xE0m ph\xF9 h\u1EE3p"), JOBS.map(j => /*#__PURE__*/React.createElement(JobCard, {
    key: j.id,
    job: j,
    onOpen: onOpen,
    saved: saved,
    onToggleSave: onToggleSave
  }))));
}
function JobDetailScreen({
  job,
  onBack,
  onApply,
  applied
}) {
  if (!job) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: '28px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onBack,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      fontSize: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "arrow-left",
    style: {
      width: 16,
      height: 16
    }
  }), "Quay l\u1EA1i"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: job.company,
    shape: "square",
    size: 56
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 22
    }
  }, job.title), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 15,
      marginTop: 4
    }
  }, job.company, " \xB7 ", job.loc)), /*#__PURE__*/React.createElement(Button, {
    variant: applied ? 'secondary' : 'primary',
    disabled: applied,
    onClick: onApply
  }, applied ? 'Đã ứng tuyển' : 'Ứng tuyển ngay')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginTop: 20,
      paddingTop: 20,
      borderTop: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "M\u1EE9c l\u01B0\u01A1ng"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginTop: 4
    }
  }, job.salary)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "H\xECnh th\u1EE9c"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginTop: 4
    }
  }, job.type)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, "\u0110\u0103ng tuy\u1EC3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      marginTop: 4
    }
  }, job.posted)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Mô tả công việc', 'Yêu cầu', 'Về công ty']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 4px',
      color: 'var(--text-secondary)',
      lineHeight: 1.7,
      fontSize: 15
    }
  }, "Ch\xFAng t\xF4i \u0111ang t\xECm ki\u1EBFm \u1EE9ng vi\xEAn cho v\u1ECB tr\xED ", job.title.toLowerCase(), " t\u1EA1i ", job.company, ". B\u1EA1n s\u1EBD l\xE0m vi\u1EC7c c\xF9ng \u0111\u1ED9i ng\u0169 nh\xE2n s\u1EF1 gi\xE0u kinh nghi\u1EC7m, tham gia v\xE0o c\xE1c d\u1EF1 \xE1n tuy\u1EC3n d\u1EE5ng quy m\xF4 l\u1EDBn v\xE0 \u0111\xF3ng g\xF3p v\xE0o chi\u1EBFn l\u01B0\u1EE3c ph\xE1t tri\u1EC3n con ng\u01B0\u1EDDi c\u1EE7a c\xF4ng ty.")));
}
function ApplicationsScreen() {
  const rows = [{
    job: 'Chuyên viên Nhân sự',
    company: 'FPT Software',
    status: 'success',
    label: 'Phỏng vấn'
  }, {
    job: 'Frontend Developer',
    company: 'Tiki Corporation',
    status: 'warning',
    label: 'Đang xem xét'
  }, {
    job: 'Nhân viên Kinh doanh B2B',
    company: 'Viettel Telecom',
    status: 'neutral',
    label: 'Đã nộp'
  }, {
    job: 'UX Designer',
    company: 'Momo',
    status: 'error',
    label: 'Không phù hợp'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: '28px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 22,
      marginBottom: 20
    }
  }, "\u0110\u01A1n \u1EE9ng tuy\u1EC3n c\u1EE7a t\xF4i"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    padding: "16px 20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700
    }
  }, r.job), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 14
    }
  }, r.company)), /*#__PURE__*/React.createElement(Badge, {
    tone: r.status
  }, r.label))))));
}
function ProfileScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: '28px 32px'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Nguy\u1EC5n V\u0103n An",
    size: 72
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 20
    }
  }, "Nguy\u1EC5n V\u0103n An"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, "Chuy\xEAn vi\xEAn Nh\xE2n s\u1EF1 \xB7 H\xE0 N\u1ED9i")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Ch\u1EC9nh s\u1EEDa h\u1ED3 s\u01A1"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 12
    }
  }, "Chu\u1EA9n b\u1ECB ph\u1ECFng v\u1EA5n AI"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: 14,
      lineHeight: 1.6,
      marginBottom: 14
    }
  }, "Luy\u1EC7n t\u1EADp tr\u1EA3 l\u1EDDi ph\u1ECFng v\u1EA5n v\u1EDBi tr\u1EE3 l\xFD AI, nh\u1EADn ph\u1EA3n h\u1ED3i t\u1EE9c th\xEC."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "B\u1EAFt \u0111\u1EA7u luy\u1EC7n t\u1EADp")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 12
    }
  }, "CV c\u1EE7a t\xF4i"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--text-secondary)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-text",
    style: {
      width: 16,
      height: 16
    }
  }), "CV_NguyenVanAn_2026.pdf"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "T\u1EA3i CV m\u1EDBi")))));
}
window.JobSeekerScreens = {
  Header,
  SearchScreen,
  JobDetailScreen,
  ApplicationsScreen,
  ProfileScreen
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/job-seeker/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
