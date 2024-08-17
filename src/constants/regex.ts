const NAME_REGEX = /^(?![_0-9])[\u4e00-\u9fa5a-zA-Z0-9\s_]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
const PICTURE_REGEX = /(\d+)-([a-zA-Z\u4e00-\u9fa5\-\s]+)\.(jpg|jpeg|png)/;
const LOWSTRENGTH_REGEX = /^[0-9a-zA-Z]+.{6,}$/;
const MEDIUMSTRENGTH_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_]).{6,}$/;
const STRONGSTRENGTH_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;

export {
  NAME_REGEX,
  PASSWORD_REGEX,
  LOWSTRENGTH_REGEX,
  MEDIUMSTRENGTH_REGEX,
  STRONGSTRENGTH_REGEX,
  PICTURE_REGEX
};
