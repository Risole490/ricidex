const iconeMenuMobile = document.getElementById('menu_mobile_icon');

// Adiciona o evento de click no ícone do menu mobile
iconeMenuMobile.addEventListener('click', () => {
    const menuMobile = document.getElementById('menu_mobile_content');// Pega o menu mobile
    menuMobile.classList.toggle('menu-mobile-content--ativo');// Adiciona ou remove a classe que exibe o menu mobile
});